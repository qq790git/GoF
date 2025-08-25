
// 单例模式 (Singleton Pattern) 示例
// 核心思想: 保证一个类只有一个实例，并提供一个全局访问点。
// 适用场景: 全局配置对象、数据库连接池、日志记录器
// 懒汉式单例 (Lazy Initialization)
class AppConfig {
    // 1. 持有私有的静态实例
    private static instance: AppConfig;

    private config: Record<string, any>;

    // 2. 将构造函数私有化
    private constructor() {
        console.log('读取配置文件... (这只会被打印一次)');
        this.config = {
            version: '1.0.0',
            server: 'https://api.example.com',
        };
    }

    public getConfig(key: string): any {
        return this.config[key];
    }

    // 3. 提供公开的静态方法获取实例
    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }
}

// ---- 如何使用 ----

// const errorConfig = new AppConfig(); //  错误: "AppConfig" 的构造函数是私有的。TS 在编译期就阻止了你！

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2); // true，它们是同一个实例！

const serverUrl = config1.getConfig('server');
console.log(`服务器地址: ${serverUrl}`);


// 饿汉式单例 (Eager Initialization)
class EagerAppConfig {
    // 在类加载时就直接创建实例
    private static readonly instance: EagerAppConfig = new EagerAppConfig();

    private constructor() {
        console.log('饿汉式：配置文件已加载！');
    }

    public static getInstance(): EagerAppConfig {
        return EagerAppConfig.instance;
    }
}

// 即使还没调用 getInstance，构造函数里的 log 也会被打印出来
//const eagerConfig = EagerAppConfig.getInstance();
