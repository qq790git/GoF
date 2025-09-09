// 1. 产品 (Product)
class Computer {
    private cpu: string = "未知";
    private ram: string = "未知";
    private storage: string = "未知";
    private gpu: string = "集成显卡";
    private os: string = "未安装操作系统";
    private accessories: string[] = [];

    // 属性的 setters，通常不会对外暴露，由Builder内部调用
    public setCPU(cpu: string): void {
        this.cpu = cpu;
    }

    public setRAM(ram: string): void {
        this.ram = ram;
    }

    public setStorage(storage: string): void {
        this.storage = storage;
    }

    public setGPU(gpu: string): void {
        this.gpu = gpu;
    }

    public installOS(os: string): void {
        this.os = os;
    }

    public addAccessory(accessory: string): void {
        this.accessories.push(accessory);
    }

    public showConfiguration(): void {
        console.log("--- 电脑配置 ---");
        console.log(`CPU: ${this.cpu}`);
        console.log(`RAM: ${this.ram}`);
        console.log(`存储: ${this.storage}`);
        console.log(`GPU: ${this.gpu}`);
        console.log(`操作系统: ${this.os}`);
        console.log(`配件: ${this.accessories.length > 0 ? this.accessories.join(', ') : '无'}`);
        console.log("-----------------");
    }
}

// 2. 抽象建造者 (Builder Interface)
interface IComputerBuilder {
    setCPU(cpu: string): this; // 返回 this 支持链式调用
    setRAM(ram: string): this;
    setStorage(storage: string): this;
    setGPU(gpu: string): this; // 可选
    installOS(os: string): this; // 可选
    addAccessory(accessory: string): this; // 可选，多次调用
    build(): Computer; // 返回最终的产品
}

// 3. 具体建造者 (Concrete Builder)
class DesktopComputerBuilder implements IComputerBuilder {
    private computer: Computer| null = null;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.computer = new Computer();
    }

    public setCPU(cpu: string): this {
        this.computer!.setCPU(cpu);
        return this;
    }

    public setRAM(ram: string): this {
        this.computer!.setRAM(ram);
        return this;
    }

    public setStorage(storage: string): this {
        this.computer!.setStorage(storage);
        return this;
    }

    public setGPU(gpu: string): this {
        this.computer!.setGPU(gpu);
        return this;
    }

    public installOS(os: string): this {
        this.computer!.installOS(os);
        return this;
    }

    public addAccessory(accessory: string): this {
        this.computer!.addAccessory(accessory);
        return this;
    }

    public build(): Computer {
        const result = this.computer!;
        this.reset(); // 构建完成后，重置建造者，以便下次使用
        return result;
    }
}

// 4. 指挥者 (Director) - 可选
class ComputerAssembler {
    private _builder: IComputerBuilder;

    constructor(builder: IComputerBuilder) {
        this._builder = builder;
    }

    public setBuilder(builder: IComputerBuilder): void {
        this._builder = builder;
    }

    public get builder(): IComputerBuilder {
        return this._builder;
    }

    // 组装一台标准办公电脑
    public assembleOfficePC(): void {
        this.builder
            .setCPU("Intel Core i5-12400")
            .setRAM("16GB DDR4")
            .setStorage("512GB NVMe SSD")
            .installOS("Windows 10 Pro");
            // No GPU, no accessories for basic office
    }

    // 组装一台高端游戏电脑
    public assembleGamingPC(): void {
        this.builder
            .setCPU("Intel Core i9-13900K")
            .setRAM("32GB DDR5")
            .setStorage("2TB NVMe SSD + 4TB HDD")
            .setGPU("NVIDIA GeForce RTX 4090")
            .installOS("Windows 11 Home")
            .addAccessory("RGB Mechanical Keyboard")
            .addAccessory("Gaming Mouse");
    }
}

// 客户端使用
console.log("--- 电脑构建示例 ---");

// 方式一：直接使用具体建造者（更灵活）
const customBuilder = new DesktopComputerBuilder();
const myCustomPC: Computer = customBuilder
    .setCPU("AMD Ryzen 7 7700X")
    .setRAM("32GB DDR5")
    .setStorage("1TB NVMe SSD")
    .setGPU("AMD Radeon RX 7900 XTX")
    .installOS("Ubuntu 22.04 LTS")
    .addAccessory("4K Monitor")
    .build();
myCustomPC.showConfiguration();

// 方式二：通过指挥者构建（适用于固定配置的场景）
const assembler = new ComputerAssembler(new DesktopComputerBuilder());

// 构建一台办公电脑
assembler.assembleOfficePC();
const officePC = assembler.builder.build(); // 注意：这里需要强制类型转换，因为Director没有直接暴露builder的build方法
officePC.showConfiguration();

// 构建一台游戏电脑
assembler.assembleGamingPC();
const gamingPC = assembler.builder.build();
gamingPC.showConfiguration();