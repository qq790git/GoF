// 1. 产品接口 (IShape)
interface IShape {
    draw(): void;
}

// 2. 具体产品 (Concrete Products)
class Circle implements IShape {
    constructor(public radius: number) {}
    draw(): void {
        console.log(`绘制圆形，半径：${this.radius}`);
    }
}

class Rectangle implements IShape {
    constructor(public width: number, public height: number) {}
    draw(): void {
        console.log(`绘制矩形，宽：${this.width}，高：${this.height}`);
    }
}

class Triangle implements IShape {
    constructor(public side1: number, public side2: number, public side3: number) {}
    draw(): void {
        console.log(`绘制三角形，边长：${this.side1},${this.side2},${this.side3}`);
    }
}

// 3. 客户端代码 (创建逻辑与使用耦合)
type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'pentagon';

function createAndDrawShape(type: ShapeType, ...args: number[]): void {
    let shape: IShape | null = null;

    // 痛点所在：大量的 if-else 或 switch-case
    if (type === 'circle') {
        shape = new Circle(args[0]!);
    } else if (type === 'rectangle') {
        shape = new Rectangle(args[0]!, args[1]!);
    } else if (type === 'triangle') {
        shape = new Triangle(args[0]!, args[1]!, args[2]!);
    } else {
        throw new Error('不支持的图形类型！');
    }

    if (shape) {
        shape.draw();
    }
}

// 使用
createAndDrawShape('circle', 5);
createAndDrawShape('rectangle', 10, 20);
createAndDrawShape('triangle', 3, 4, 5);
//createAndDrawShape('pentagon', 5); // 编译通过，运行时报错

// 4.1 抽象工厂接口 (Creator)
interface IShapeFactory {
    createShape(...args: number[]): IShape; // 这就是“工厂方法”
}

// 4.2 具体工厂 (Concrete Creators)
class CircleFactory implements IShapeFactory {
    createShape(...args: number[]): IShape {
        console.log('圆形工厂：创建圆形中...');
        // 这里可以封装复杂的圆形创建和初始化逻辑
        return new Circle(args[0]!);
    }
}

class RectangleFactory implements IShapeFactory {
    createShape(...args: number[]): IShape {
        console.log('矩形工厂：创建矩形中...');
        // 这里可以封装复杂的矩形创建和初始化逻辑
        return new Rectangle(args[0]!, args[1]!);
    }
}

class TriangleFactory implements IShapeFactory {
    createShape(...args: number[]): IShape {
        console.log('三角形工厂：创建三角形中...');
        // 这里可以封装复杂的三角形创建和初始化逻辑
        return new Triangle(args[0]!, args[1]!, args[2]!);
    }
}

// 5. 客户端代码 (通过工厂来创建和使用)
function clientCode(factory: IShapeFactory, ...args: number[]): void {
    const shape = factory.createShape(...args); // 客户端只通过工厂接口来创建对象
    shape.draw();
}

// 使用工厂方法模式
console.log('\n--- 使用工厂方法模式 ---');
const circleFactory = new CircleFactory();
clientCode(circleFactory, 5); // 客户端传入具体的工厂实例

const rectangleFactory = new RectangleFactory();
clientCode(rectangleFactory, 10, 20);

const triangleFactory = new TriangleFactory();
clientCode(triangleFactory, 3, 4, 5);

// 新增一个 Pentagon 图形
// 我们只需要：
// 1. 新增 Pentagon 类实现 IShape
// 2. 新增 PentagonFactory 实现 IShapeFactory
// 无需修改任何已有的工厂或 clientCode 函数！
class Pentagon implements IShape {
    constructor(public sideLength: number) {}
    draw(): void {
        console.log(`绘制五边形，边长：${this.sideLength}`);
    }
}

class PentagonFactory implements IShapeFactory {
    createShape(...args: number[]): IShape {
        console.log('五边形工厂：创建五边形中...');
        return new Pentagon(args[0]!);
    }
}

console.log('\n--- 扩展新图形：五边形 ---');
const pentagonFactory = new PentagonFactory();
clientCode(pentagonFactory, 8); // 轻松扩展，无需改动旧代码！
// 通过工厂方法模式，我们实现了创建逻辑与使用逻辑的解耦，
// 大大提升了代码的可维护性和扩展性。
// 新增一个图形，只需要新增一个类和一个工厂，无需改动已有的代码！
