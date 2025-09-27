// Strategy: 验证策略的统一接口
interface IValidationStrategy {
    validate(value: string): { isValid: boolean; message: string };
}

// Concrete Strategy 1: 非空验证
class RequiredStrategy implements IValidationStrategy {
    validate(value: string) {
        const isValid = value.trim() !== '';
        return {
            isValid,
            message: isValid ? '' : '此字段为必填项。',
        };
    }
}

// Concrete Strategy 2: 邮箱格式验证
class EmailStrategy implements IValidationStrategy {
    validate(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        return {
            isValid,
            message: isValid ? '' : '请输入有效的邮箱地址。',
        };
    }
}

// Concrete Strategy 3: 最小长度验证
class MinLengthStrategy implements IValidationStrategy {
    private minLength: number;

    constructor(minLength: number) {
        this.minLength = minLength;
    }

    validate(value: string) {
        const isValid = value.length >= this.minLength;
        return {
            isValid,
            message: isValid ? '' : `长度不能少于 ${this.minLength} 个字符。`,
        };
    }
}

// Context: 使用验证策略的表单字段
class FormField {
    private value: string;
    private strategy: IValidationStrategy;

    constructor(initialValue: string, strategy: IValidationStrategy) {
        this.value = initialValue;
        this.strategy = strategy;
    }

    // 允许在运行时更改验证策略
    setValidationStrategy(strategy: IValidationStrategy) {
        this.strategy = strategy;
    }

    setValue(value: string) {
        this.value = value;
    }

    // 委托给策略对象执行验证
    public validate() {
        return this.strategy.validate(this.value);
    }
}

// --- 客户端代码 ---

// 创建一个需要非空验证的用户名输入框
const usernameField = new FormField('', new RequiredStrategy());
console.log('用户名初始验证:', usernameField.validate()); // { isValid: false, message: '此字段为必填项。' }

usernameField.setValue('JohnDoe');
console.log('用户名输入后验证:', usernameField.validate()); // { isValid: true, message: '' }

console.log('\n' + '='.repeat(30) + '\n');

// 创建一个需要邮箱格式验证的邮箱输入框
const emailField = new FormField('not-an-email', new EmailStrategy());
console.log('邮箱格式错误验证:', emailField.validate()); // { isValid: false, message: '请输入有效的邮箱地址。' }

emailField.setValue('test@example.com');
console.log('邮箱格式正确验证:', emailField.validate()); // { isValid: true, message: '' }

console.log('\n' + '='.repeat(30) + '\n');

// 创建一个需要密码长度验证的密码输入框
const passwordField = new FormField('123', new MinLengthStrategy(8));
console.log('密码长度不足验证:', passwordField.validate()); // { isValid: false, message: '长度不能少于 8 个字符。' }

// 假设用户注册后，需要增加更强的密码策略，我们可以动态切换！
// passwordField.setValidationStrategy(new StrongPasswordStrategy()); // 假设我们新增了一个更复杂的策略
passwordField.setValue('password123');
console.log('密码长度足够验证:', passwordField.validate()); // { isValid: true, message: '' }
