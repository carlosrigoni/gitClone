class Commit {
  constructor(treeHash, message, parentHashes = [], date = new Date()) {
    this.treeHash = treeHash;
    this.message = message;
    this.parentHashes = parentHashes;
    this.date = date;
  }

  generateCommitContent() {
    let content = `commit ${this.treeHash}\n`;
    this.parentHashes.forEach((hash) => {
      content += `parent ${hash}\n`;
    });
    content += `Date: ${this.date.toUTCString()}\n\n${this.message}\n`;
    return content;
  }
}
