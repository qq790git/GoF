// Target: 我们系统期望的支付接口
interface PaymentProcessor {
    processPayment(amount: number): void;
}

class Store {
    private paymentProcessor: PaymentProcessor;

    constructor(processor: PaymentProcessor) {
        this.paymentProcessor = processor;
    }

    purchaseItem(price: number) {
        console.log(`准备购买一件价格为 ${price} 的商品...`);
        this.paymentProcessor.processPayment(price);
    }
}

// Adaptee 1: Ios 的支付服务
class IosPaymentGateway {
    public sendPayment(total: number, currency: string): void {
        console.log(`Ios平台 支付了 ${currency} ${total}`);
    }
}

// Adaptee 2: android 的支付服务
class AndroidGateway {
    public submitTransaction(value: number, description: string): boolean {
        console.log(`android 平台 支付了 ${description}, 金额: ${value}`);
        return true; // 表示交易成功
    }
}

// Adapter for Ios
class IosAdapter implements PaymentProcessor {
    private iosGateway: IosPaymentGateway;

    constructor() {
        this.iosGateway = new IosPaymentGateway();
    }

    processPayment(amount: number): void {
        // 将我们简单的 processPayment 调用，转换为复杂的 sendPayment 调用
        console.log('适配器正在转换 ios 支付请求...');
        this.iosGateway.sendPayment(amount, 'USD');
    }
}

// Adapter for Android
class AndroidAdapter implements PaymentProcessor {
    private androidGateway: AndroidGateway;

    constructor() {
        this.androidGateway = new AndroidGateway();
    }

    processPayment(amount: number): void {
        // 将 processPayment 调用，转换为 submitTransaction 调用
        console.log('适配器正在转换 android 支付请求...');
        this.androidGateway.submitTransaction(amount, '商品购买');
    }
}

// 使用 Ios 支付
const iosAdapter = new IosAdapter();
const storeWithPayPal = new Store(iosAdapter);
storeWithPayPal.purchaseItem(100);

console.log('\n' + '='.repeat(30) + '\n');

// 切换到 Android 支付，Store 类代码无需任何修改！
const androidAdapter = new AndroidAdapter();
const storeWithStripe = new Store(androidAdapter);
storeWithStripe.purchaseItem(75);
