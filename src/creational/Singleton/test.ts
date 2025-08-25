import { print as printA } from './a';
import { print as printB } from './b';
printA();
printB();

/**
 * [Logger]: 模块 A 的消息
 * [ '[2025-08-25T04:21:28.889Z] 模块 A 的消息' ]
 * [Logger]: 模块 B 的消息
 * [
 *   '[2025-08-25T04:21:28.889Z] 模块 A 的消息',
 *   '[2025-08-25T04:21:28.890Z] 模块 B 的消息'
 * ]
 */

// npx ts-node  .\src\creational\Singleton\test.ts