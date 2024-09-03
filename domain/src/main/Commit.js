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

  write(objectsRepository) {
    const content = this.generateCommitContent();
    const commitHash = objectsRepository.write(content);
    return commitHash;
  }

  isUpToDate(otherCommitHash, objectsRepository) {
    const otherCommitAncestors =
      objectsRepository.getAncestors(otherCommitHash);
    return otherCommitAncestors.includes(this.getHash(objectsRepository));
  }

  getHash(objectsRepository) {
    const content = this.generateCommitContent();
    return objectsRepository.hash(content);
  }

  static createFromCurrentState(index, message, refs, objectsRepository) {
    const treeHash = index.writeTree();
    const parentHashes = refs.getParentHashes();
    const commit = new Commit(treeHash, message, parentHashes);
    const commitHash = commit.write(objectsRepository);
    refs.updateHead(commitHash);
    return commit;
  }
}

export default Commit;
