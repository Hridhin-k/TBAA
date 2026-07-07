# EmailJS setup — Registration

The registration form (`components/application/ApplicationJourney.tsx`) submits
through `lib/api/registration.ts` using [EmailJS](https://www.emailjs.com) — no
backend. Follow these steps once to make the form live.

## 1. Create an EmailJS account + service

1. Sign up at https://www.emailjs.com and verify your email.
2. **Email Services → Add New Service** (Gmail, Outlook, or custom SMTP).
   Connect the inbox that should *send* the mail. Note the **Service ID**.

## 2. Create the notification template

1. **Email Templates → Create New Template**.
2. Open the **Content** tab, switch the editor to **Code / HTML**, and paste
   **only** the HTML from [`registration-notification.html`](./registration-notification.html).
   Do not paste any comments that contain curly-brace placeholders — EmailJS
   parses those even inside HTML comments and will throw
   *"One or more dynamic variables are corrupted"*.
3. Open the **Settings** tab and set:

   | Field      | Value                                      |
   | ---------- | ------------------------------------------ |
   | To Email   | `hello@thebetteracademy.com` (your inbox)  |
   | From Name  | `The Better Academy`                       |
   | Reply To   | `{{reply_to}}`                             |
   | Subject    | `New application from {{full_name}}`       |

4. Save and note the **Template ID**.

## 3. Get your Public Key

**Account → General → Public Key**. Copy it.

## 4. Add the environment variables

Put these in `.env.local` (local) and in your Cloudflare Pages/Workers
dashboard (production):

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

Restart `npm run dev` after editing `.env.local`.

## 5. (Optional) Applicant auto-reply

To also confirm receipt to the applicant, use
[`applicant-autoreply.html`](./applicant-autoreply.html) — either enable
EmailJS **Auto-Reply** on the notification template (set its To Email to
`{{email}}`), or create a second template and send it from
`registration.ts`. See the comment at the top of that file.

## Variable contract

These are the exact variables sent from `lib/api/registration.ts`. Use them
anywhere in the template as `{{variable}}`:

| Variable          | Source field    | Notes                          |
| ----------------- | --------------- | ------------------------------ |
| `full_name`       | `fullName`      |                                |
| `email`           | `email`         | also sent as `reply_to`        |
| `reply_to`        | `email`         | use as **Reply To** in Settings |
| `phone`           | `phone`         |                                |
| `age`             | `age`           |                                |
| `city`            | `city`          |                                |
| `profession`      | `profession`    |                                |
| `experience`      | `experience`    | ASCII-safe label               |
| `motivation`      | `motivation`    | multi-line                     |
| `portfolio_link`  | `portfolioLink` | `Not provided` when empty      |
| `instagram`       | `instagram`     |                                |
| `linkedin`        | `linkedin`      |                                |
| `submitted_at`    | —               | ISO-style timestamp            |
| `source`          | —               | always `website`               |

## Troubleshooting

**"Template: One or more dynamic variables are corrupted"**

1. Re-paste the latest `registration-notification.html` (no Mustache sections,
   no curly braces in HTML comments).
2. In **Settings**, use `Reply To: {{reply_to}}` and
   `Subject: New application from {{full_name}}` — avoid parentheses in the subject.
3. Confirm every `{{variable}}` in the template matches the table above exactly.
4. Click **Save** in EmailJS after every edit.

## Testing

Fill in the three env vars, run `npm run dev`, complete the form, and check
your team inbox. Free EmailJS accounts allow 200 emails/month.

### CLI test (recommended after editing the template)

Triggers a real EmailJS send using the same template variables as the form:

```bash
npm run test:registration-email
```

**One-time setup:** EmailJS blocks non-browser API calls by default. In the
[EmailJS dashboard](https://dashboard.emailjs.com/admin/account/security):

1. **Account → Security → Allow API access from non-browser applications** (enable).
2. If API access is in **strict mode**, add your **Private Key**
   (Account → General → Private Key) to `.env.local`:

   ```bash
   EMAILJS_PRIVATE_KEY=your_private_key
   ```

   This is only used by the CLI test — the website never needs it, so keep it
   out of `NEXT_PUBLIC_*` and out of version control.

Optional — override the applicant email used in `reply_to` / template body:

```bash
npm run test:registration-email -- --email you@example.com
```

If the inbox shows *"One or more dynamic variables are corrupted"*, re-paste
`registration-notification.html` into the EmailJS dashboard and check Settings
(see Troubleshooting above).
