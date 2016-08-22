import Tabs from './Tabs';

class Migrations {
  constructor(migrations) {
    this._migrations = migrations;
  }

  run() {
    return this._migrations.reduce((before, migration) => {
      return before.then(() => migration.run());
    }, Promise.resolve());
  }
}

export default new Migrations([
  new Tabs(),
]);