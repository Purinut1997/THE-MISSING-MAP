/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TownNode, TownStreet } from '../types/game.ts';

export const TOWN_NODES: TownNode[] = [
  {
    id: 'train_station',
    name: 'Train Station',
    thaiName: 'สถานีรถไฟ',
    x: 18,
    y: 15,
    category: 'service',
    description: 'At the northwest corner of town on Maple Street. Where travelers arrive.',
    clue: 'Trains depart every morning to the capital.',
    phonetic: '/treɪn ˈsteɪʃn/',
    street: 'Maple Street (West)',
    spatialRelations: 'Next to Hospital · On Maple Street · Northwest corner'
  },
  {
    id: 'hospital',
    name: 'Hospital',
    thaiName: 'โรงพยาบาล',
    x: 50,
    y: 15,
    category: 'public',
    description: 'On Maple Street, opposite the Pharmacy and between Train Station and School.',
    clue: 'Dr. Clara works here and found a medical envelope clue.',
    phonetic: '/ˈhɒspɪtl/',
    street: 'Maple Street & Park Ave.',
    spatialRelations: 'Between Train Station & School · North of Town Square'
  },
  {
    id: 'school',
    name: 'School',
    thaiName: 'โรงเรียน',
    x: 82,
    y: 15,
    category: 'public',
    description: 'At the corner of Maple Street and Oak Lane, next to the Library.',
    clue: 'Students study English and geography here.',
    phonetic: '/skuːl/',
    street: 'Maple Street & Oak Lane',
    spatialRelations: 'Corner of Maple St. & Oak Lane · Next to Library · Northeast corner'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    thaiName: 'ร้านขายยา',
    x: 32,
    y: 33,
    category: 'service',
    description: 'On High Street, between Train Station and Police Station, opposite the Hospital area.',
    clue: 'Medicines and first-aid kits are kept here.',
    phonetic: '/ˈfɑːrməsi/',
    street: 'High Street (North-West)',
    spatialRelations: 'On High Street · Near Hospital & Police Station'
  },
  {
    id: 'library',
    name: 'Library',
    thaiName: 'ห้องสมุด',
    x: 68,
    y: 33,
    category: 'public',
    description: 'On Oak Lane, next to the School and behind the Bank.',
    clue: 'The Chief Archivist hid an ancient town map fragment here.',
    phonetic: '/ˈlaɪbrəri/',
    street: 'Oak Lane (North-East)',
    spatialRelations: 'On Oak Lane · Next to School · Behind the Bank'
  },
  {
    id: 'police_station',
    name: 'Police Station',
    thaiName: 'สถานีตำรวจ',
    x: 18,
    y: 50,
    category: 'public',
    description: 'At the corner of High Street and King Street, opposite the Town Square.',
    clue: 'Officer Dan guards safety and logs reported missing items.',
    phonetic: '/pəˈliːs ˈsteɪʃn/',
    street: 'High Street & King St.',
    spatialRelations: 'Corner of High St. & King St. · West of Town Square'
  },
  {
    id: 'clock_tower',
    name: 'Town Square & Clock Tower',
    thaiName: 'หอนาฬิกาใจกลางเมือง',
    x: 50,
    y: 50,
    category: 'landmark',
    description: 'The historic heart of English Town at the central crossroads of King St. and Park Ave.',
    clue: 'Where the shadows cross at sunset, the ancient vault awaits!',
    phonetic: '/klɒk ˈtaʊər/',
    street: 'King Street & Park Avenue',
    spatialRelations: 'Central Crossroads · Between Police Station & Bank · North of Restaurant'
  },
  {
    id: 'bank',
    name: 'Bank',
    thaiName: 'ธนาคาร',
    x: 82,
    y: 50,
    category: 'service',
    description: 'At the intersection of King Street and Oak Lane, in front of the Library.',
    clue: 'Safe deposit boxes hold precious town documents.',
    phonetic: '/bæŋk/',
    street: 'King Street & Oak Lane',
    spatialRelations: 'Corner of King St. & Oak Lane · In front of Library · Next to Bookshop'
  },
  {
    id: 'post_office',
    name: 'Post Office',
    thaiName: 'ที่ทำการไปรษณีย์',
    x: 28,
    y: 68,
    category: 'service',
    description: 'On Park Avenue / King St area, next to Restaurant and across from Police Station.',
    clue: 'All letters and clues from citizens are sorted here.',
    phonetic: '/pəʊst ˈɒfɪs/',
    street: 'Park Avenue (West block)',
    spatialRelations: 'Next to Restaurant · South of Police Station'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    thaiName: 'ร้านอาหาร',
    x: 48,
    y: 68,
    category: 'commercial',
    description: 'In front of the Clock Tower, on Park Avenue, next to Post Office.',
    clue: 'Delicious warm meals and fresh tea for hungry detectives.',
    phonetic: '/ˈrestrɒnt/',
    street: 'Park Avenue (Central)',
    spatialRelations: 'On Park Avenue · In front of Clock Tower · Next to Post Office'
  },
  {
    id: 'bookshop',
    name: 'Bookshop',
    thaiName: 'ร้านหนังสือ',
    x: 72,
    y: 68,
    category: 'commercial',
    description: 'On Oak Lane, south of the Bank and north of the Supermarket.',
    clue: 'Mr. Page keeps old guidebooks and dictionaries.',
    phonetic: '/ˈbʊkʃɒp/',
    street: 'Oak Lane (Central)',
    spatialRelations: 'On Oak Lane · South of Bank · Opposite Restaurant block'
  },
  {
    id: 'bus_station',
    name: 'Bus Station',
    thaiName: 'สถานีรถประจำทาง',
    x: 90,
    y: 68,
    category: 'service',
    description: 'At the eastern end of King Street, east of Bank.',
    clue: 'Local buses run past the river and park.',
    phonetic: '/bʌs ˈsteɪʃn/',
    street: 'King Street (Far East)',
    spatialRelations: 'East of Bank · Near eastern town boundary'
  },
  {
    id: 'cinema',
    name: 'Cinema',
    thaiName: 'โรงภาพยนตร์',
    x: 18,
    y: 86,
    category: 'leisure',
    description: 'At the corner of High Street and River Road, west of Central Park.',
    clue: 'Old adventure movies are shown on weekends.',
    phonetic: '/ˈsɪnəmə/',
    street: 'High Street & River Road',
    spatialRelations: 'Corner of High St. & River Road · West of Central Park · Southwest corner'
  },
  {
    id: 'park',
    name: 'Central Park',
    thaiName: 'สวนสาธารณะใจกลางเมือง',
    x: 42,
    y: 86,
    category: 'leisure',
    description: 'Along River Road, between the Cinema and the Museum, across the river.',
    clue: 'Green grass, duck pond, and shady oak trees.',
    phonetic: '/ˈsentrəl pɑːrk/',
    street: 'River Road (Central)',
    spatialRelations: 'Between Cinema & Museum · Facing River Thames'
  },
  {
    id: 'museum',
    name: 'Museum',
    thaiName: 'พิพิธภัณฑ์',
    x: 64,
    y: 86,
    category: 'public',
    description: 'On River Road, east of Central Park and west of Supermarket.',
    clue: 'Ancient artifacts of English Town are exhibited here.',
    phonetic: '/mjuˈziːəm/',
    street: 'River Road (East block)',
    spatialRelations: 'Between Central Park & Supermarket · On River Road'
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    thaiName: 'ซูเปอร์มาร์เก็ต',
    x: 84,
    y: 86,
    category: 'commercial',
    description: 'At the corner of River Road and Oak Lane, southeast corner of town.',
    clue: 'Groceries, fresh fruits, and detective snacks.',
    phonetic: '/ˈsuːpərmɑːrkɪt/',
    street: 'River Road & Oak Lane',
    spatialRelations: 'Corner of River Road & Oak Lane · South of Bookshop · Southeast corner'
  }
];

export const TOWN_STREETS = [
  { name: 'Maple Street', from: 'West (Train Station)', to: 'East (School)', orientation: 'Horizontal (Top)' },
  { name: 'King Street', from: 'West (Police Station)', to: 'East (Bank & Bus Station)', orientation: 'Horizontal (Middle)' },
  { name: 'River Road', from: 'West (Cinema)', to: 'East (Supermarket)', orientation: 'Horizontal (Bottom)' },
  { name: 'High Street', from: 'North (Train Station)', to: 'South (Cinema)', orientation: 'Vertical (Left)' },
  { name: 'Park Avenue', from: 'North (Hospital)', to: 'South (Park)', orientation: 'Vertical (Center)' },
  { name: 'Oak Lane', from: 'North (School)', to: 'South (Supermarket)', orientation: 'Vertical (Right)' }
];

export const MAP_TEXT_DESCRIPTION = `
English Town Navigation Grid:
- Streets:
  * Maple Street (Northern East-West road): Train Station (west), Hospital (middle), School (east).
  * King Street (Central East-West road): Police Station (west), Town Square & Clock Tower (center intersection), Bank (east), Bus Station (far east).
  * River Road (Southern East-West road): Cinema (west), Central Park (mid-west), Museum (mid-east), Supermarket (east).
  * High Street (Western North-South road): Connects Train Station, Pharmacy, Police Station, and Cinema.
  * Park Avenue (Central North-South road): Connects Hospital, Clock Tower, Restaurant, and Park.
  * Oak Lane (Eastern North-South road): Connects School, Library, Bank, Bookshop, and Supermarket.
`;
