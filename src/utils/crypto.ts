export function uuid(): string {
  // 生成16进制的32个字符
  const randomChars = '0123456789abcdef'.split('');
  const uuid: string[] = [];

  for (let i = 0; i < 32; i++) {
    // 每次循环随机选择一个16进制字符
    uuid.push(randomChars[Math.floor(Math.random() * 16)]);
  }

  // 替换第8、12、16、20位为'-'，这是UUID的标准格式
  uuid[8] = uuid[12] = uuid[16] = uuid[20] = '-';

  return uuid.join('');
}
