// Observer Interface
interface IObserver {
    update(subject: ISubject): void;
}

// Subject Interface
interface ISubject {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}

// Concrete Subject
class Product implements ISubject {
    public readonly name: string;
    private observers: IObserver[] = [];
    private _inStock: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    get inStock(): boolean {
        return this._inStock;
    }

    // 状态改变的方法
    public setStockStatus(status: boolean): void {
        console.log(`\n[PRODUCT]：商品 "${this.name}" 的库存状态变为 ${status ? '有货' : '缺货'}.`);
        this._inStock = status;
        this.notify(); // 状态改变，通知所有观察者！
    }

    public subscribe(observer: IObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Observer has been attached already.');
        }
        this.observers.push(observer);
        console.log(`[SYSTEM]: ${observer.constructor.name} 成功订阅 "${this.name}".`);
    }

    public unsubscribe(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }
        this.observers.splice(observerIndex, 1);
        console.log(`[SYSTEM]: ${observer.constructor.name} 已取消订阅.`);
    }

    public notify(): void {
        console.log(`[PRODUCT]: 正在通知所有 ${this.observers.length} 位订阅者...`);
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

// Concrete Observer 1: UI Updater
class UINotifier implements IObserver {
    update(subject: ISubject): void {
        if (subject instanceof Product) {
            console.log(
                `[UI]: 收到通知！商品 "${subject.name}" 现在 ${
                    subject.inStock ? '有货' : '缺货'
                }，正在更新页面显示...`
            );
        }
    }
}

// Concrete Observer 2: Email Service
class EmailNotifier implements IObserver {
    update(subject: ISubject): void {
        if (subject instanceof Product && subject.inStock) {
            console.log(`[Email]: 收到通知！商品 "${subject.name}" 已到货，正在准备发送邮件...`);
        }
    }
}

const ps5 = new Product('PlayStation 5');

const ui = new UINotifier();
const emailService = new EmailNotifier();

// 订阅
ps5.subscribe(ui);
ps5.subscribe(emailService);

// 状态变化 -> 缺货 (假设初始为缺货，这里为了演示，手动设置一次)
ps5.setStockStatus(false);
// 此时只会触发UI更新缺货状态，邮件服务因为逻辑判断不会发送邮件

// 关键时刻：到货了！
ps5.setStockStatus(true);
// 此时UI和Email服务都会收到通知并执行相应操作

// 一个用户不再关心了，取消订阅邮件
ps5.unsubscribe(emailService);

// 再次变为缺货
ps5.setStockStatus(false);
// 这次只有UI会收到通知
