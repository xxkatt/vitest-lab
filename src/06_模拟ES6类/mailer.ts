export class Mailer {
  constructor(private endpoint: string) {}

  async send(email: string, content: string) {
    // 浏览器通过后端接口发送邮件，实际投递由后端完成
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, content}),
    })

    if (!response.ok) throw new Error('邮件发送失败')
  }
}
