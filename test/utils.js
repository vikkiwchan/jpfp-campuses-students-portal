const AsciiTable = require('ascii-table');

const logTable = () => {
  const table = new AsciiTable('students');
  table
    .setHeading('id', 'firstName', 'lastName', 'email', 'imageUrl', 'gpa')
    .addRow(
      1,
      'Angela',
      'Boehm',
      'angela.boehm@usc.edu',
      'https://as2.ftcdn.net/jpg/02/76/44/01/500_F_276440189_NipLHqCA6EmdxmnyFtom1mDixC63GGKT.jpg',
      3.8
    )
    .addRow(
      2,
      'Christian',
      'Sporer',
      'christian.sporer@usc.edu',
      'https://as2.ftcdn.net/jpg/02/76/44/01/500_F_276440189_NipLHqCA6EmdxmnyFtom1mDixC63GGKT.jpg',
      3.3
    );
  console.log(
    "We're seeding the database with 2 sample students so that our Express routes have some data to retrieve. The ids may be different, but the table will look like this "
  );
  console.log(table.toString(), '\n');
};

module.exports = {
  logTable,
};
