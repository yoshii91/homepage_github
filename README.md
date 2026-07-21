# Contact API (Express)

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

- Open: `http://localhost:3000/contact.html`
- API health: `GET /health`
- Contact submit: `POST /contact`

## POST /contact

Content-Type: `multipart/form-data`

Required fields:
- `name`
- `phone`
- `email`
- `address`
- `service`

Optional fields:
- `detail`
- `photo` (image)

Success response:

```json
{
  "success": true,
  "id": "TEMP-20260329-ABC123"
}
```

Error response example:

```json
{
  "success": false,
  "error": "入力内容に不備があります",
  "details": [
    { "field": "name", "message": "必須項目です" }
  ]
}
```

## 保存方式

この構成では問い合わせ内容をDBやローカルファイルへ保存せず、Gmail SMTP で指定先へ直接送信します。

- `CONTACT_NOTIFY_TO` に届く受信先メールアドレスを設定
- `CONTACT_NOTIFY_FROM` に送信元メールアドレスを設定
- `SMTP_HOST` は通常 `smtp.gmail.com`
- `SMTP_USER` と `SMTP_PASS` は Gmail の SMTP 認証情報を設定
- `photo` は必要に応じてメール添付として送信されます

## Security (minimum)

- `helmet`
- `cors`
- `express-rate-limit`
- upload size limit + image-only filter
