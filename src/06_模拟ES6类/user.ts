export class User {
  // public：将构造函数参数保存为实例属性，可以通过 user.name 访问
  constructor(public name: string) {}

  getName() {
    return this.name
  }

  // static：静态方法属于类，通过 User.getRole() 调用，不需要先创建实例
  static getRole() {
    return '普通用户'
  }
}
