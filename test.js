const arr = [
  { groupName: 'Best 5 Group', age: 90 },
  { groupName: 'Bull 6 Group', age: 90 },
  { groupName: 'Boutique Group', age: 90 },
  { groupName: 'Besto 5 Group', age: 90 },
  { groupName: 'Bound 5 Group', age: 90 }
];

console.log(arr.filter(g => g.groupName.toLowerCase().includes('5'.toLowerCase())));