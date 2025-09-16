// Component: 通知器的统一接口
interface INotifier {
    send(message: string): void;
}

// Concrete Component: 基础通知器，只打印到控制台
class BaseNotifier implements INotifier {
    send(message: string): void {
        console.log(`[站内信]：发送消息 - "${message}"`);
    }
}

// Base Decorator: 装饰器基类
abstract class NotifierDecorator implements INotifier {
    protected wrappedNotifier: INotifier;

    constructor(notifier: INotifier) {
        this.wrappedNotifier = notifier;
    }

    // 将 send 请求委托给被包装的对象
    send(message: string): void {
        this.wrappedNotifier.send(message);
    }
}

// Concrete Decorator 1: 短信通知装饰器
class SMSDecorator extends NotifierDecorator {
    send(message: string): void {
        super.send(message); // 首先调用原始的 send 方法
        console.log(`[短信]：发送消息 - "${message}"`);
    }
}

// Concrete Decorator 2: 邮件通知装饰器
class EmailDecorator extends NotifierDecorator {
    send(message: string): void {
        super.send(message); // 调用原始方法
        console.log(`[邮件]：发送消息 - "${message}"`);
    }
}

const message = '您的订单已发货！';

// 1. 只需要一个基础通知器
console.log('--- 基础通知 ---');
const basicNotifier = new BaseNotifier();
basicNotifier.send(message);

console.log('\n' + '='.repeat(30) + '\n');

// 2. 我需要站内信 + 短信
console.log('--- 站内信 + 短信 ---');
let notifierWithSMS = new BaseNotifier();
notifierWithSMS = new SMSDecorator(notifierWithSMS);
notifierWithSMS.send(message);

console.log('\n' + '='.repeat(30) + '\n');

// 3. 我需要站内信 + 短信 + 邮件
console.log('--- 站内信 + 短信 + 邮件 ---');
let notifierWithAll = new BaseNotifier();
notifierWithAll = new SMSDecorator(notifierWithAll);
notifierWithAll = new EmailDecorator(notifierWithAll);
notifierWithAll.send(message);

console.log('\n' + '='.repeat(30) + '\n');

// 4. 还可以有更疯狂的组合：站内信 + 邮件 + 再次短信（如果业务需要）
console.log('--- 疯狂组合 ---');
let crazyNotifier: INotifier = new BaseNotifier();
crazyNotifier = new EmailDecorator(crazyNotifier);
crazyNotifier = new SMSDecorator(crazyNotifier);
crazyNotifier.send('系统即将维护，请注意！');
