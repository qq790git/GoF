// Subject: 文件下载器的接口
interface IDownloader {
    download(url: string): Promise<string>;
}

// Real Subject: 真实的文件下载器，模拟一个耗时的操作
class RealFileDownloader implements IDownloader {
    constructor() {
        // 模拟昂贵的构造过程
        console.log('RealFileDownloader: 正在初始化，连接服务器...');
        // 假设这里有复杂的初始化逻辑
    }

    public async download(url: string): Promise<string> {
        console.log(`RealFileDownloader: 开始从 ${url} 下载文件...`);
        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const fileContent = `这是从 ${url} 下载的文件内容`;
        console.log('RealFileDownloader: 文件下载完成。');
        return fileContent;
    }
}

// Proxy: 虚拟代理，实现懒加载
class LazyDownloaderProxy implements IDownloader {
    private realDownloader: RealFileDownloader | null = null;
    private url: string;

    constructor(url: string) {
        this.url = url;
        console.log('LazyDownloaderProxy: 实例已创建，但真实下载器尚未初始化。');
    }

    public download(): Promise<string> {
        // 只有在第一次调用 download 时，才真正创建 RealFileDownloader
        if (this.realDownloader === null) {
            console.log('LazyDownloaderProxy: 检测到首次下载请求，开始初始化真实下载器。');
            this.realDownloader = new RealFileDownloader();
        }
        return this.realDownloader.download(this.url);
    }
}

// Proxy: 保护代理，实现访问控制
class ProtectedDownloaderProxy implements IDownloader {
    private realDownloader: RealFileDownloader;
    private userRole: 'admin' | 'guest';

    constructor(userRole: 'admin' | 'guest') {
        this.realDownloader = new RealFileDownloader(); // 这里为了演示，直接创建
        this.userRole = userRole;
    }

    public download(url: string): Promise<string> {
        if (this.userRole === 'admin') {
            console.log('ProtectedDownloaderProxy: 权限验证通过！');
            return this.realDownloader.download(url);
        } else {
            console.error('ProtectedDownloaderProxy: 权限不足，禁止下载！');
            return Promise.reject(new Error('Access Denied'));
        }
    }
}

// Proxy: 缓存代理
class CachingDownloaderProxy implements IDownloader {
    private realDownloader: RealFileDownloader;
    private cache: Map<string, string> = new Map();

    constructor() {
        this.realDownloader = new RealFileDownloader();
    }

    public async download(url: string): Promise<string> {
        if (this.cache.has(url)) {
            console.log(`CachingDownloaderProxy: 命中缓存，直接返回 ${url} 的内容。`);
            return this.cache.get(url)!;
        }

        console.log(`CachingDownloaderProxy: 未命中缓存，请求真实下载器...`);
        const fileContent = await this.realDownloader.download(url);
        this.cache.set(url, fileContent); // 下载后存入缓存
        return fileContent;
    }
}

// --- 使用 ---
async function startDown() {
    // --- 使用 ---
    console.log('\n--- 缓存测试 ---');
    const cacheProxy = new CachingDownloaderProxy();
    console.log('第一次下载:');
    await cacheProxy.download('https://example.com/logo.png');
    console.log('\n第二次下载同一文件:');
    await cacheProxy.download('https://example.com/logo.png');
}

startDown();
