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
   the contents of [`registration-notification.html`](./registration-notification.html).
3. Open the **Settings** tab and set:

   | Field      | Value                                             |
   | ---------- | ------------------------------------------------- |
   | To Email   | `hello@thebetteracademy.com` (your team inbox)    |
   | From Name  | `The Better Academy`                              |
   | Reply To   | `{{email}}`                                       |
   | Subject    | `New application — {{full_name}} ({{experience}})` |

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
| `email`           | `email`         | use as **Reply To**            |
| `phone`           | `phone`         |                                |
| `age`             | `age`           |                                |
| `city`            | `city`          |                                |
| `profession`      | `profession`    |                                |
| `experience`      | `experience`    | human label, e.g. `1–3 years`  |
| `motivation`      | `motivation`    | multi-line                     |
| `portfolio_link`  | `portfolioLink` | may be empty — `{{#if}}` guard |
| `instagram`       | `instagram`     |                                |
| `linkedin`        | `linkedin`      |                                |
| `submitted_at`    | —               | local timestamp                |
| `source`          | —               | always `website`               |

## Testing

Fill in the three env vars, run `npm run dev`, complete the form, and check
your team inbox. Free EmailJS accounts allow 200 emails/month.
