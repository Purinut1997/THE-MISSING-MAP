/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelConfig, LeaderboardPlayer } from '../types/game.ts';

export const LEVELS_CONFIG: LevelConfig[] = [
  // ==========================================
  // LEVEL 1: VOCABULARY HUNTER (คำศัพท์สถานที่ในเมือง)
  // Beginner level: short, direct clues identifying everyday town places
  // ==========================================
  {
    id: 1,
    code: 'LEVEL_1',
    title: 'LEVEL 1: VOCABULARY HUNTER',
    thaiTitle: 'ด่านที่ 1: นักล่าคำศัพท์สถานที่ (Places in Town)',
    subtitle: 'เรียนรู้และทายคำศัพท์สถานที่สำคัญในเมือง ด้วยประโยคภาษาอังกฤษเข้าใจง่ายสำหรับผู้เริ่มต้น',
    storyScene:
      'Welcome Junior Detective! The treasure map of English Town has disappeared. First, let us learn the important places around town. Read the easy English clues to find them!',
    thaiStoryScene:
      'ยินดีต้อนรับนักสืบฝึกหัด! แผนที่สมบัติของเมืองภาษาอังกฤษหายไปอย่างลึกลับ ก่อนอื่นเรามาเรียนรู้คำศัพท์สถานที่สำคัญรอบเมืองกันก่อน อ่านเบาะแสด้านล่างแล้วหาคำตอบกันนะ',
    evidenceKeyName: 'กุญแจทองแดงเข็มทิศ (Copper Compass Key)',
    evidenceKeyDescription: 'กุญแจทองแดงเข็มทิศ: ผ่านการเรียนรู้คำศัพท์สถานที่รอบเมือง',
    requiredMasteryScore: 80,
    challenges: [
      {
        id: 'L1_C1',
        levelId: 1,
        missionNumber: 1,
        type: 'vocab',
        title: 'Buying Medicine (ซื้อยา)',
        thaiTitle: 'เบาะแสที่ 1: ร้านขายยา (Pharmacy)',
        stimulusType: 'clue',
        stimulus:
          'I am sick today. I need medicine. I go to buy medicine from the pharmacist here.',
        stimulusContext: 'Clue Note 1: High Street (เบาะแสแผ่นที่ 1)',
        question: 'Where can you buy medicine?',
        thaiQuestion: 'คุณสามารถซื้อยา (buy medicine) ได้ที่สถานที่ใด?',
        options: ['At the pharmacy', 'At the cinema', 'At the park', 'At the zoo'],
        correctAnswer: 0,
        evidenceOptions: [
          '"I am sick today."',
          '"I need medicine."',
          '"I go to buy medicine from the pharmacist here."',
          '"Clue Note 1: High Street"'
        ],
        correctEvidence: 2,
        explanation: 'We buy medicine (ยา) from the pharmacist at the pharmacy (ร้านขายยา).',
        thaiExplanation: 'เราซื้อยา (buy medicine) ได้ที่ร้านขายยา (pharmacy) จากเภสัชกร (pharmacist)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์สำคัญ: Pharmacy & Medicine',
            content: 'Pharmacy = ร้านขายยา, Medicine = ยา, Sick = ป่วย',
            thaiContent: 'medicine แปลว่า ยา ส่วน pharmacy คือ ร้านขายยา'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at the last sentence: "I go to buy medicine from the pharmacist here."',
            thaiContent: 'ดูประโยคสุดท้ายที่บอกว่า "ไปซื้อยาจากเภสัชกรที่นี่"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'วิธีคิดหาคำตอบ',
            content: 'Cinema is for watching movies. Park is for running. Only Pharmacy sells medicine.',
            thaiContent: 'โรงหนัง (cinema) หรือสวน (park) ไม่มีขายยา จึงตอบ Pharmacy'
          }
        ],
        xpReward: 25,
        skillCategory: 'vocabulary',
        mapHighlightNodeId: 'pharmacy'
      },
      {
        id: 'L1_C2',
        levelId: 1,
        missionNumber: 2,
        type: 'vocab',
        title: 'Borrowing Books (ยืมหนังสือ)',
        thaiTitle: 'เบาะแสที่ 2: ห้องสมุด (Library)',
        stimulusType: 'clue',
        stimulus:
          'Tom likes to read storybooks. He goes to borrow three English books from the library.',
        stimulusContext: 'Clue Note 2: Oak Lane (เบาะแสแผ่นที่ 2)',
        question: 'Where can Tom borrow books to read?',
        thaiQuestion: 'ทอมสามารถยืมหนังสืออ่าน (borrow books) ได้ที่สถานที่ใด?',
        options: ['At the library', 'At the bank', 'At the supermarket', 'At the hospital'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Tom likes to read storybooks."',
          '"He goes to borrow three English books from the library."',
          '"Clue Note 2: Oak Lane"',
          '"Three English books"'
        ],
        correctEvidence: 1,
        explanation: 'We read and borrow books at the library (ห้องสมุด).',
        thaiExplanation: 'เราอ่านและยืมหนังสือ (borrow books) ที่ห้องสมุด (library)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์สำคัญ: Library & Book',
            content: 'Library = ห้องสมุด, Borrow = ยืม, Read = อ่าน',
            thaiContent: 'library แปลว่า ห้องสมุด สำหรับอ่านและยืมหนังสือ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "borrow three English books from the library."',
            thaiContent: 'ดูคำว่า borrow (ยืม) และ books from the library (หนังสือจากห้องสมุด)'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'วิธีคิดหาคำตอบ',
            content: 'You keep money in a bank. You buy food in a supermarket. You borrow books in a library.',
            thaiContent: 'ธนาคารไว้ฝากเงิน ซูเปอร์มาร์เก็ตไว้ซื้อของ มีห้องสมุดไว้สำหรับยืมหนังสือ'
          }
        ],
        xpReward: 25,
        skillCategory: 'vocabulary',
        mapHighlightNodeId: 'library'
      },
      {
        id: 'L1_C3',
        levelId: 1,
        missionNumber: 3,
        type: 'vocab',
        title: 'Sending Letters (ส่งจดหมาย)',
        thaiTitle: 'เบาะแสที่ 3: ที่ทำการไปรษณีย์ (Post Office)',
        stimulusType: 'clue',
        stimulus:
          'Ben writes a letter to his friend. He goes to the post office to buy stamps and send the letter.',
        stimulusContext: 'Clue Note 3: Park Avenue (เบาะแสแผ่นที่ 3)',
        question: 'Where do you send letters and buy stamps?',
        thaiQuestion: 'สถานที่ใดที่คุณไปส่งจดหมายและซื้อแสตมป์ (send letters & buy stamps)?',
        options: ['At the post office', 'At the restaurant', 'At the school', 'At the cinema'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Ben writes a letter to his friend."',
          '"He goes to the post office to buy stamps and send the letter."',
          '"To his friend."',
          '"Clue Note 3: Park Avenue"'
        ],
        correctEvidence: 1,
        explanation: 'We send letters and buy stamps at the post office (ที่ทำการไปรษณีย์).',
        thaiExplanation: 'เราส่งจดหมายและซื้อแสตมป์ที่ที่ทำการไปรษณีย์ (post office)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์สำคัญ: Post Office & Letter',
            content: 'Post office = ที่ทำการไปรษณีย์, Letter = จดหมาย, Stamp = แสตมป์',
            thaiContent: 'post office คือ ที่ทำการไปรษณีย์ สำหรับส่งจดหมายและพัสดุ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Read sentence 2: "goes to the post office to buy stamps and send the letter."',
            thaiContent: 'สังเกตคำว่า post office, stamps และ send the letter'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'วิธีคิดหาคำตอบ',
            content: 'A restaurant is for eating. A school is for studying. A post office is for letters.',
            thaiContent: 'ร้านอาหารสำหรับทานข้าว โรงเรียนสำหรับเรียน ไปรษณีย์สำหรับส่งจดหมาย'
          }
        ],
        xpReward: 25,
        skillCategory: 'vocabulary',
        mapHighlightNodeId: 'post_office'
      },
      {
        id: 'L1_C4',
        levelId: 1,
        missionNumber: 4,
        type: 'vocab',
        title: 'Helping Sick People (รักษาผู้ป่วย)',
        thaiTitle: 'เบาะแสที่ 4: โรงพยาบาล (Hospital)',
        stimulusType: 'clue',
        stimulus:
          'Doctors and nurses work here. They help sick people get better.',
        stimulusContext: 'Clue Note 4: Maple Street (เบาะแสแผ่นที่ 4)',
        question: 'Where do doctors and nurses work to help sick people?',
        thaiQuestion: 'คุณหมอและพยาบาล (doctors and nurses) ทำงานรักษาคนป่วยที่ไหน?',
        options: ['At the hospital', 'At the bus station', 'At the bookshop', 'At the museum'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Doctors and nurses work here."',
          '"They help sick people get better."',
          '"Clue Note 4: Maple Street"',
          '"Sick people"'
        ],
        correctEvidence: 0,
        explanation: 'Doctors and nurses work at the hospital (โรงพยาบาล).',
        thaiExplanation: 'คุณหมอ (doctors) และพยาบาล (nurses) ทำงานที่โรงพยาบาล (hospital)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์สำคัญ: Doctor & Hospital',
            content: 'Doctor = หมอ, Nurse = พยาบาล, Hospital = โรงพยาบาล',
            thaiContent: 'hospital แปลว่า โรงพยาบาล มีหมอและพยาบาลคอยดูแลผู้ป่วย'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at the first sentence: "Doctors and nurses work here."',
            thaiContent: 'ดูประโยคแรกที่บอกว่า "Doctors and nurses work here"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'วิธีคิดหาคำตอบ',
            content: 'A bookshop sells books. A bus station has buses. Doctors work in a hospital.',
            thaiContent: 'ร้านหนังสือขายหนังสือ สถานีรถเมล์มีรถบัส คุณหมอทำงานในโรงพยาบาล'
          }
        ],
        xpReward: 25,
        skillCategory: 'vocabulary',
        mapHighlightNodeId: 'hospital'
      },
      {
        id: 'L1_C5',
        levelId: 1,
        missionNumber: 5,
        type: 'vocab',
        title: 'Buying Fresh Food (ซื้อของกินของใช้)',
        thaiTitle: 'เบาะแสที่ 5: ซูเปอร์มาร์เก็ต (Supermarket)',
        stimulusType: 'clue',
        stimulus:
          'Mother goes to the supermarket every Sunday. She buys fresh milk, bread, and red apples.',
        stimulusContext: 'Clue Note 5: River Road (เบาะแสแผ่นที่ 5)',
        question: 'Where does Mother go to buy milk, bread, and apples?',
        thaiQuestion: 'คุณแม่ไปซื้อนม ขนมปัง และแอปเปิ้ล (milk, bread, and apples) ที่ไหน?',
        options: ['To the supermarket', 'To the police station', 'To the train station', 'To the library'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Mother goes to the supermarket every Sunday."',
          '"She buys fresh milk, bread, and red apples."',
          '"Clue Note 5: River Road"',
          '"Every Sunday"'
        ],
        correctEvidence: 0,
        explanation: 'Mother buys food and groceries at the supermarket (ซูเปอร์มาร์เก็ต).',
        thaiExplanation: 'คุณแม่ไปซื้ออาหารและของใช้ที่ซูเปอร์มาร์เก็ต (supermarket)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์สำคัญ: Supermarket & Food',
            content: 'Supermarket = ซูเปอร์มาร์เก็ต/ห้างสรรพสินค้า, Milk = นม, Bread = ขนมปัง',
            thaiContent: 'supermarket คือ ตลาดติดแอร์หรือห้างสรรพสินค้าที่มีของกินของใช้จำหน่าย'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Sentence 1 says: "Mother goes to the supermarket every Sunday."',
            thaiContent: 'ประโยคแรกระบุชื่อสถานที่ชัดเจนว่า supermarket'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'วิธีคิดหาคำตอบ',
            content: 'A police station is for safety. A train station has trains. We buy food at a supermarket.',
            thaiContent: 'สถานีตำรวจดูแลความปลอดภัย สถานีรถไฟมีรถไฟ ซื้อของกินต้องไปที่ซูเปอร์มาร์เก็ต'
          }
        ],
        xpReward: 25,
        skillCategory: 'vocabulary',
        mapHighlightNodeId: 'supermarket'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: PREPOSITION CODE (คำบุพบทบอกตำแหน่ง)
  // Beginner level: next to, opposite, between, near, in front of
  // ==========================================
  {
    id: 2,
    code: 'LEVEL_2',
    title: 'LEVEL 2: PREPOSITION CODE',
    thaiTitle: 'ด่านที่ 2: รหัสคำบุพบทบอกตำแหน่ง (Prepositions of Place)',
    subtitle: 'ฝึกใช้คำบุพบทง่ายๆ เช่น next to (ติดกับ), opposite (ตรงข้าม), between (ระหว่าง), near (ใกล้)',
    storyScene:
      'Great work! You found the town places. Now let us locate where each building is. Look at the town map and read the prepositions carefully.',
    thaiStoryScene:
      'เก่งมากนักสืบ! ตอนนี้เรารู้จักชื่อสถานที่แล้ว ขั้นต่อไปมาดูว่าแต่ละอาคารตั้งอยู่ตรงไหน สังเกตคำบุพบทบอกตำแหน่งบนแผนที่กันนะ',
    evidenceKeyName: 'กุญแจเหล็กพิกัดเมือง (Iron Coordinates Key)',
    evidenceKeyDescription: 'กุญแจเหล็กพิกัดเมือง: เข้าใจตำแหน่งและคำบุพบทบอกสถานที่',
    requiredMasteryScore: 80,
    challenges: [
      {
        id: 'L2_C1',
        levelId: 2,
        missionNumber: 1,
        type: 'prep',
        title: 'Next To (ติดกับ / ข้างๆ)',
        thaiTitle: 'เบาะแสที่ 1: ติดกับ (Next to)',
        stimulusType: 'map_rule',
        stimulus:
          'Look at King Street. The School is next to the Library. You can walk there in one minute.',
        stimulusContext: 'Map Clue: King Street',
        question: 'What place is next to the School?',
        thaiQuestion: 'สถานที่ใดอยู่ติดกับโรงเรียน (next to the School)?',
        options: ['The Library', 'The Train Station', 'The Park', 'The Cinema'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Look at King Street."',
          '"The School is next to the Library."',
          '"You can walk there in one minute."',
          '"King Street"'
        ],
        correctEvidence: 1,
        explanation: '"Next to" means beside or adjacent. The School is next to the Library.',
        thaiExplanation: '"Next to" แปลว่า ติดกับ หรืออยู่ข้างๆ โดยในประโยคบอกว่าโรงเรียนอยู่ติดกับห้องสมุด (Library)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Next to (ติดกับ / อยู่ข้างๆ)',
            content: 'Next to = ติดกับ, School = โรงเรียน, Library = ห้องสมุด',
            thaiContent: 'Next to แปลว่า ติดกันหรืออยู่ข้างๆ กัน'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "The School is next to the Library."',
            thaiContent: 'ดูประโยค: "The School is next to the Library."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The sentence directly tells us the Library is next to the School.',
            thaiContent: 'โจทย์ถามว่าอะไรอยู่ติดกับโรงเรียน คำตอบคือ The Library'
          }
        ],
        xpReward: 25,
        skillCategory: 'prepositions',
        mapHighlightNodeId: 'school'
      },
      {
        id: 'L2_C2',
        levelId: 2,
        missionNumber: 2,
        type: 'prep',
        title: 'Opposite (ตรงข้ามกัน)',
        thaiTitle: 'เบาะแสที่ 2: อยู่ตรงข้าม (Opposite / Across from)',
        stimulusType: 'map_rule',
        stimulus:
          'The Bank is opposite the Park on King Street. You can cross the street to get to the Bank.',
        stimulusContext: 'Map Clue: Opposite the Park',
        question: 'What building is opposite the Park?',
        thaiQuestion: 'อาคารใดอยู่ตรงข้ามกับสวนสาธารณะ (opposite the Park)?',
        options: ['The Bank', 'The Hospital', 'The School', 'The Bus Station'],
        correctAnswer: 0,
        evidenceOptions: [
          '"The Bank is opposite the Park on King Street."',
          '"You can cross the street to get to the Bank."',
          '"On King Street."',
          '"Cross the street."'
        ],
        correctEvidence: 0,
        explanation: '"Opposite" means across the street. The Bank is opposite the Park.',
        thaiExplanation: '"Opposite" แปลว่า ตรงข้าม โดยธนาคาร (The Bank) อยู่ตรงข้ามกับสวนสาธารณะ (The Park)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Opposite (ตรงข้าม)',
            content: 'Opposite = ตรงข้าม, Bank = ธนาคาร, Park = สวนสาธารณะ',
            thaiContent: 'opposite หมายถึง อยู่ฝั่งตรงข้ามกัน มีถนนคั่นกลาง'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Read sentence 1: "The Bank is opposite the Park on King Street."',
            thaiContent: 'ประโยคแรกบอกชัดเจนว่า The Bank is opposite the Park'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'Cross the street from the Park to find the Bank.',
            thaiContent: 'ข้ามถนนจากสวนสาธารณะไปจะเจอธนาคาร (The Bank)'
          }
        ],
        xpReward: 25,
        skillCategory: 'prepositions',
        mapHighlightNodeId: 'bank'
      },
      {
        id: 'L2_C3',
        levelId: 2,
        missionNumber: 3,
        type: 'prep',
        title: 'Between (อยู่ระหว่าง)',
        thaiTitle: 'เบาะแสที่ 3: อยู่ตรงกลางระหว่างสองสถานที่ (Between)',
        stimulusType: 'map_rule',
        stimulus:
          'On High Street, the Cinema is between the Bookshop and the Restaurant. People love watching movies there.',
        stimulusContext: 'Map Clue: High Street',
        question: 'What place is between the Bookshop and the Restaurant?',
        thaiQuestion: 'สถานที่ใดอยู่ระหว่างร้านหนังสือกับร้านอาหาร (between the Bookshop and Restaurant)?',
        options: ['The Cinema', 'The Hospital', 'The Bank', 'The Train Station'],
        correctAnswer: 0,
        evidenceOptions: [
          '"On High Street, the Cinema is between the Bookshop and the Restaurant."',
          '"People love watching movies there."',
          '"On High Street"',
          '"The Bookshop and the Restaurant"'
        ],
        correctEvidence: 0,
        explanation: '"Between" means in the middle of two things. The Cinema is between the Bookshop and Restaurant.',
        thaiExplanation: '"Between...and..." แปลว่า อยู่ระหว่างสองสิ่ง โดยโรงหนัง (The Cinema) อยู่ตรงกลางระหว่างร้านหนังสือกับร้านอาหาร',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Between (อยู่ระหว่าง...กับ...)',
            content: 'Between A and B = อยู่ระหว่าง A กับ B, Cinema = โรงหนัง',
            thaiContent: 'between แปลว่า อยู่ตรงกลางระหว่าง 2 แห่ง'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Notice: "...the Cinema is between the Bookshop and the Restaurant."',
            thaiContent: 'ดูตรง "...the Cinema is between the Bookshop and the Restaurant."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The place in the middle is the Cinema.',
            thaiContent: 'สถานที่ที่อยู่ตรงกลางระหว่าง 2 ร้านคือ The Cinema'
          }
        ],
        xpReward: 25,
        skillCategory: 'prepositions',
        mapHighlightNodeId: 'cinema'
      },
      {
        id: 'L2_C4',
        levelId: 2,
        missionNumber: 4,
        type: 'prep',
        title: 'Near (อยู่ใกล้กับ)',
        thaiTitle: 'เบาะแสที่ 4: อยู่ใกล้กับ (Near)',
        stimulusType: 'map_rule',
        stimulus:
          'The Pharmacy is near the Hospital on Maple Street. It takes only two minutes to walk there.',
        stimulusContext: 'Map Clue: Maple Street',
        question: 'What place is near the Hospital?',
        thaiQuestion: 'สถานที่ใดอยู่ใกล้กับโรงพยาบาล (near the Hospital)?',
        options: ['The Pharmacy', 'The Train Station', 'The Park', 'The Town Square'],
        correctAnswer: 0,
        evidenceOptions: [
          '"The Pharmacy is near the Hospital on Maple Street."',
          '"It takes only two minutes to walk there."',
          '"On Maple Street"',
          '"Two minutes"'
        ],
        correctEvidence: 0,
        explanation: '"Near" means close to. The Pharmacy is near the Hospital.',
        thaiExplanation: '"Near" แปลว่า ใกล้กับ โดยร้านขายยา (The Pharmacy) อยู่ใกล้กับโรงพยาบาล (Hospital)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Near (ใกล้กับ)',
            content: 'Near = ใกล้กับ, Pharmacy = ร้านขายยา, Hospital = โรงพยาบาล',
            thaiContent: 'near แปลว่า ใกล้เคียง หรือระยะทางสั้นๆ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Sentence 1 says: "The Pharmacy is near the Hospital..."',
            thaiContent: 'ประโยคบอกชัดว่า The Pharmacy is near the Hospital'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The building near the hospital is the Pharmacy.',
            thaiContent: 'อาคารที่อยู่ใกล้โรงพยาบาลคือร้านขายยา (Pharmacy)'
          }
        ],
        xpReward: 25,
        skillCategory: 'prepositions',
        mapHighlightNodeId: 'pharmacy'
      },
      {
        id: 'L2_C5',
        levelId: 2,
        missionNumber: 5,
        type: 'prep',
        title: 'In Front Of (อยู่ด้านหน้า)',
        thaiTitle: 'เบาะแสที่ 5: อยู่ด้านหน้า (In front of)',
        stimulusType: 'map_rule',
        stimulus:
          'On River Road, the Bus Station is in front of the Train Station. Passengers can catch a bus easily.',
        stimulusContext: 'Map Clue: River Road',
        question: 'Where is the Bus Station on River Road?',
        thaiQuestion: 'สถานีรถประจำทาง (Bus Station) อยู่ตรงไหนบนถนน River Road?',
        options: [
          'In front of the Train Station',
          'Behind the Cinema',
          'Inside the Bank',
          'Under the School'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"On River Road, the Bus Station is in front of the Train Station."',
          '"Passengers can catch a bus easily."',
          '"On River Road"',
          '"Catch a bus"'
        ],
        correctEvidence: 0,
        explanation: '"In front of" means positioned before or ahead. The Bus Station is in front of the Train Station.',
        thaiExplanation: '"In front of" แปลว่า อยู่ข้างหน้า โดยสถานีรถเมล์อยู่ข้างหน้าสถานีรถไฟ (Train Station)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: In front of (อยู่ด้านหน้า)',
            content: 'In front of = อยู่ข้างหน้า / ด้านหน้า, Bus station = สถานีรถประจำทาง',
            thaiContent: 'in front of หมายถึง อยู่ด้านหน้า'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Read: "the Bus Station is in front of the Train Station."',
            thaiContent: 'ดูข้อความ "in front of the Train Station"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The Bus Station is right in front of the Train Station.',
            thaiContent: 'ตอบข้อ A: In front of the Train Station'
          }
        ],
        xpReward: 25,
        skillCategory: 'prepositions',
        mapHighlightNodeId: 'bus_station'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: DIRECTION DECODER (เส้นทางบอกทิศพาเพลิน)
  // Beginner level: Walk straight, turn left, turn right, on your left/right
  // ==========================================
  {
    id: 3,
    code: 'LEVEL_3',
    title: 'LEVEL 3: DIRECTION DECODER',
    thaiTitle: 'ด่านที่ 3: เส้นทางบอกทิศ (Giving & Following Directions)',
    subtitle: 'ฝึกอ่านคำสั่งบอกทิศทางง่ายๆ: Walk straight (เดินตรงไป), Turn left (เลี้ยวซ้าย), Turn right (เลี้ยวขวา)',
    storyScene:
      'A witness saw a clue hidden along the roads! Follow the simple directions step by step to reach the destination.',
    thaiStoryScene:
      'พยานเห็นเบาะแสถูกซ่อนอยู่ตามเส้นทางในเมือง! ทำตามคำสั่งบอกทางทีละก้าว เดินตรงไป เลี้ยวซ้าย หรือเลี้ยวขวา เพื่อไปให้ถึงเป้าหมายนะ',
    evidenceKeyName: 'กุญแจเงินเข็มทิศนำทาง (Silver Navigation Key)',
    evidenceKeyDescription: 'กุญแจเงินเข็มทิศนำทาง: เดินตามคำสั่งบอกทิศทางได้ถูกต้อง',
    requiredMasteryScore: 80,
    challenges: [
      {
        id: 'L3_C1',
        levelId: 3,
        missionNumber: 1,
        type: 'direction',
        title: 'Walk Straight (เดินตรงไป)',
        thaiTitle: 'เบาะแสที่ 1: เดินตรงไปบนถนน (Walk straight)',
        stimulusType: 'route_clue',
        stimulus:
          'Start at the Train Station on River Road. Walk straight ahead. Look to your left. You will see the Hospital.',
        stimulusContext: 'Route Instruction 1',
        question: 'What building will you see on your left?',
        thaiQuestion: 'เมื่อเดินตรงไป คุณจะเห็นอาคารใดอยู่ทางซ้ายมือของคุณ (on your left)?',
        options: ['The Hospital', 'The Cinema', 'The Bookshop', 'The Bank'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Start at the Train Station on River Road."',
          '"Walk straight ahead."',
          '"Look to your left. You will see the Hospital."',
          '"River Road"'
        ],
        correctEvidence: 2,
        explanation: 'When walking straight from the Train Station, look to your left to see the Hospital.',
        thaiExplanation: 'เมื่อเดินตรงไป แล้วมองไปทางซ้ายมือ (on your left) จะพบโรงพยาบาล (The Hospital)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Walk straight & Left',
            content: 'Walk straight = เดินตรงไป, On your left = ทางซ้ายมือของคุณ',
            thaiContent: 'Walk straight แปลว่า เดินตรงไปข้างหน้า และ left คือ ด้านซ้าย'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "Look to your left. You will see the Hospital."',
            thaiContent: 'ดูประโยค: "You will see the Hospital"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The Hospital is the building on your left.',
            thaiContent: 'อาคารที่อยู่ทางซ้ายคือ The Hospital'
          }
        ],
        xpReward: 25,
        skillCategory: 'directions',
        mapHighlightNodeId: 'hospital',
        expectedFinalNode: 'hospital'
      },
      {
        id: 'L3_C2',
        levelId: 3,
        missionNumber: 2,
        type: 'direction',
        title: 'Turn Left (เลี้ยวซ้าย)',
        thaiTitle: 'เบาะแสที่ 2: เลี้ยวซ้ายที่หัวมุม (Turn left)',
        stimulusType: 'route_clue',
        stimulus:
          'Start at the School. Walk straight on King Street. Turn left into Oak Lane. Stop! The building on your right is the Library.',
        stimulusContext: 'Route Instruction 2',
        question: 'What building is on your right after turning left into Oak Lane?',
        thaiQuestion: 'อาคารใดอยู่ทางขวามือของคุณหลังเลี้ยวซ้ายเข้าซอย Oak Lane?',
        options: ['The Library', 'The Supermarket', 'The Park', 'The Cinema'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Start at the School."',
          '"Walk straight on King Street."',
          '"Turn left into Oak Lane."',
          '"The building on your right is the Library."'
        ],
        correctEvidence: 3,
        explanation: 'After turning left into Oak Lane, the building on your right is the Library.',
        thaiExplanation: 'หลังจากเลี้ยวซ้ายเข้า Oak Lane อาคารทางขวามือคือห้องสมุด (The Library)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Turn left (เลี้ยวซ้าย)',
            content: 'Turn left = เลี้ยวซ้าย, On your right = ทางขวามือของคุณ',
            thaiContent: 'Turn left คือ เลี้ยวซ้าย และ right คือ ด้านขวา'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at the last sentence: "The building on your right is the Library."',
            thaiContent: 'ดูประโยคสุดท้ายที่ระบุชื่ออาคารว่า "Library"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'You reached the Library on your right.',
            thaiContent: 'ตอบข้อ A: The Library'
          }
        ],
        xpReward: 25,
        skillCategory: 'directions',
        mapHighlightNodeId: 'library',
        expectedFinalNode: 'library'
      },
      {
        id: 'L3_C3',
        levelId: 3,
        missionNumber: 3,
        type: 'direction',
        title: 'Turn Right (เลี้ยวขวา)',
        thaiTitle: 'เบาะแสที่ 3: เลี้ยวขวาเข้าสู่ถนนใหม่ (Turn right)',
        stimulusType: 'route_clue',
        stimulus:
          'Start at the Park. Walk straight to King Street. Turn right at the corner. Walk fifty meters. The Bank is on your left.',
        stimulusContext: 'Route Instruction 3',
        question: 'Where do you arrive after turning right and walking fifty meters?',
        thaiQuestion: 'คุณจะไปถึงที่ใดหลังจากเลี้ยวขวาตรงหัวมุมแล้วเดิน 50 เมตร?',
        options: ['At the Bank', 'At the Train Station', 'At the Museum', 'At the School'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Start at the Park."',
          '"Turn right at the corner."',
          '"Walk fifty meters. The Bank is on your left."',
          '"At the corner"'
        ],
        correctEvidence: 2,
        explanation: 'Turn right at the corner, walk fifty meters, and the Bank is on your left.',
        thaiExplanation: 'เลี้ยวขวาที่หัวมุม เดินไป 50 เมตร จะพบธนาคาร (The Bank) อยู่ทางซ้ายมือ',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Turn right & Corner',
            content: 'Turn right = เลี้ยวขวา, Corner = หัวมุมถนน, Bank = ธนาคาร',
            thaiContent: 'Turn right แปลว่า เลี้ยวขวา และ corner คือ หัวมุม'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Notice: "The Bank is on your left."',
            thaiContent: 'ดูประโยคสุดท้าย: "The Bank is on your left."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The destination reached is the Bank.',
            thaiContent: 'ปลายทางคือ The Bank'
          }
        ],
        xpReward: 25,
        skillCategory: 'directions',
        mapHighlightNodeId: 'bank',
        expectedFinalNode: 'bank'
      },
      {
        id: 'L3_C4',
        levelId: 3,
        missionNumber: 4,
        type: 'direction',
        title: 'Walk South (เดินมุ่งหน้าไปทางทิศใต้)',
        thaiTitle: 'เบาะแสที่ 4: เดินไปตามถนน Park Avenue',
        stimulusType: 'route_clue',
        stimulus:
          'Start at the Town Clock Tower. Walk down on Park Avenue. Stop at the big blue building on your right. It is the Police Station.',
        stimulusContext: 'Route Instruction 4',
        question: 'What is the big blue building on your right on Park Avenue?',
        thaiQuestion: 'อาคารสีฟ้าขนาดใหญ่ทางขวามือของคุณบนถนน Park Avenue คือที่ใด?',
        options: ['The Police Station', 'The Hospital', 'The Cinema', 'The Bookshop'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Start at the Town Clock Tower."',
          '"Walk down on Park Avenue."',
          '"Stop at the big blue building on your right."',
          '"It is the Police Station."'
        ],
        correctEvidence: 3,
        explanation: 'The big blue building on your right on Park Avenue is the Police Station.',
        thaiExplanation: 'อาคารสีฟ้าทางขวามือบนถนน Park Avenue คือสถานีตำรวจ (The Police Station)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Police Station',
            content: 'Police station = สถานีตำรวจ, Blue building = อาคารสีฟ้า',
            thaiContent: 'police station แปลว่า สถานีตำรวจ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at the last sentence: "It is the Police Station."',
            thaiContent: 'ประโยคสุดท้ายบอกคำตอบตรงๆ ว่า "It is the Police Station."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'You reached the Police Station.',
            thaiContent: 'ตอบข้อ A: The Police Station'
          }
        ],
        xpReward: 25,
        skillCategory: 'directions',
        mapHighlightNodeId: 'police_station',
        expectedFinalNode: 'police_station'
      },
      {
        id: 'L3_C5',
        levelId: 3,
        missionNumber: 5,
        type: 'direction',
        title: 'At the Corner (ตรงหัวมุมถนน)',
        thaiTitle: 'เบาะแสที่ 5: ร้านหนังสือตรงหัวมุม (At the corner)',
        stimulusType: 'route_clue',
        stimulus:
          'Walk straight along High Street. Turn right at the corner of Oak Lane. The Bookshop is right there at the corner.',
        stimulusContext: 'Route Instruction 5',
        question: 'Which shop is at the corner of High Street and Oak Lane?',
        thaiQuestion: 'ร้านใดตั้งอยู่ตรงหัวมุมถนน High Street ตัดกับ Oak Lane?',
        options: ['The Bookshop', 'The Bus Station', 'The Supermarket', 'The Pharmacy'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Walk straight along High Street."',
          '"Turn right at the corner of Oak Lane."',
          '"The Bookshop is right there at the corner."',
          '"High Street"'
        ],
        correctEvidence: 2,
        explanation: 'The Bookshop is right at the corner of High Street and Oak Lane.',
        thaiExplanation: 'ร้านหนังสือ (The Bookshop) ตั้งอยู่ตรงหัวมุมถนนพอดี',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Bookshop & Corner',
            content: 'Bookshop = ร้านขายหนังสือ, At the corner = ตรงหัวมุมถนน',
            thaiContent: 'bookshop คือ ร้านขายหนังสือ และ at the corner แปลว่า ตรงหัวมุม'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Read sentence 3: "The Bookshop is right there at the corner."',
            thaiContent: 'ประโยคที่ 3 ระบุว่า "The Bookshop is right there at the corner."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The shop located at the corner is the Bookshop.',
            thaiContent: 'ตอบข้อ A: The Bookshop'
          }
        ],
        xpReward: 25,
        skillCategory: 'directions',
        mapHighlightNodeId: 'bookshop',
        expectedFinalNode: 'bookshop'
      }
    ]
  },

  // ==========================================
  // LEVEL 4: DIALOGUE MISSION (บทสนทนาถามทางในเมือง)
  // Beginner level: Clear A & B dialogues asking "Excuse me, where is...?"
  // ==========================================
  {
    id: 4,
    code: 'LEVEL_4',
    title: 'LEVEL 4: DIALOGUE MISSION',
    thaiTitle: 'ด่านที่ 4: บทสนทนาถามทาง (Everyday Dialogue)',
    subtitle: 'ฝึกอ่านบทสนทนาสั้นๆ ที่มักออกสอบ O-NET เช่น Excuse me, where is the...? (ขอโทษครับ/ค่ะ ...อยู่ที่ไหน?)',
    storyScene:
      'The town witnesses are talking! Listen to their short conversations to uncover important clues about the missing map.',
    thaiStoryScene:
      'ชาวเมืองกำลังพูดคุยกัน! มาอ่านบทสนทนาสั้นๆ ในชีวิตประจำวันเพื่อค้นหาเบาะแสสำคัญเกี่ยวกับแผนที่ที่หายไปกันเถอะ',
    evidenceKeyName: 'กุญแจทองสำริดแห่งการสื่อสาร (Bronze Dialogue Key)',
    evidenceKeyDescription: 'กุญแจทองสำริดแห่งการสื่อสาร: เข้าใจบทสนทนาถามและบอกทางภาษาอังกฤษ',
    requiredMasteryScore: 80,
    challenges: [
      {
        id: 'L4_C1',
        levelId: 4,
        missionNumber: 1,
        type: 'dialogue',
        title: 'Finding the Supermarket (ถามทางไปซูเปอร์มาร์เก็ต)',
        thaiTitle: 'เบาะแสที่ 1: ขอถามทางไปซูเปอร์มาร์เก็ต',
        stimulusType: 'dialogue',
        stimulus:
          'Ben: "Excuse me, where is the Supermarket?"\nOfficer: "Walk straight on Maple Street. It is next to the Museum."',
        stimulusContext: 'Dialogue at Maple Street (บทสนทนา)',
        question: 'Where is the Supermarket according to the officer?',
        thaiQuestion: 'คุณตำรวจบอกว่าซูเปอร์มาร์เก็ตตั้งอยู่ที่ไหน?',
        options: ['Next to the Museum', 'Behind the School', 'Inside the Bank', 'On the train'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Excuse me, where is the Supermarket?"',
          '"Walk straight on Maple Street."',
          '"It is next to the Museum."',
          '"Ben and Officer"'
        ],
        correctEvidence: 2,
        explanation: 'The police officer says: "It is next to the Museum."',
        thaiExplanation: 'ตำรวจบอกว่าซูเปอร์มาร์เก็ตอยู่ติดกับพิพิธภัณฑ์ ("It is next to the Museum.")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Excuse me & Where is...',
            content: 'Excuse me = ขอโทษครับ/ค่ะ, Where is = ...อยู่ที่ไหน, Museum = พิพิธภัณฑ์',
            thaiContent: 'Excuse me ใช้ขึ้นต้นเวลาสอบถามทางอย่างสุภาพ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at what the Officer says: "It is next to the Museum."',
            thaiContent: 'ดูประโยคตอบของ Officer: "It is next to the Museum."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The officer tells Ben that the supermarket is next to the Museum.',
            thaiContent: 'ตอบข้อ A: Next to the Museum'
          }
        ],
        xpReward: 25,
        skillCategory: 'dialogue',
        mapHighlightNodeId: 'supermarket'
      },
      {
        id: 'L4_C2',
        levelId: 4,
        missionNumber: 2,
        type: 'dialogue',
        title: 'Going to the Library (ถามทางไปห้องสมุด)',
        thaiTitle: 'เบาะแสที่ 2: จะไปห้องสมุดได้อย่างไร',
        stimulusType: 'dialogue',
        stimulus:
          'Tourist: "Excuse me, how can I get to the Library?"\nGirl: "Go straight along King Street. The Library is on your left."',
        stimulusContext: 'Dialogue at King Street (บทสนทนา)',
        question: 'Where is the Library when you walk along King Street?',
        thaiQuestion: 'เมื่อเดินไปตามถนน King Street ห้องสมุดจะอยู่ตรงไหน?',
        options: ['On your left', 'On your right', 'Under the ground', 'At the train station'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Excuse me, how can I get to the Library?"',
          '"Go straight along King Street."',
          '"The Library is on your left."',
          '"Tourist and Girl"'
        ],
        correctEvidence: 2,
        explanation: 'The girl says the Library is on your left.',
        thaiExplanation: 'เด็กผู้หญิงบอกว่าห้องสมุดอยู่ทางซ้ายมือของคุณ ("The Library is on your left.")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: How can I get to...',
            content: 'How can I get to... = ฉันจะไปที่...ได้อย่างไร, On your left = ทางซ้ายมือของคุณ',
            thaiContent: 'How can I get to... เป็นสำนวนถามทางยอดฮิตในข้อสอบ O-NET'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at the girl\'s answer: "The Library is on your left."',
            thaiContent: 'ดูคำตอบของเด็กหญิง: "The Library is on your left."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The girl tells the tourist that it is on the left.',
            thaiContent: 'ตอบข้อ A: On your left'
          }
        ],
        xpReward: 25,
        skillCategory: 'dialogue',
        mapHighlightNodeId: 'library'
      },
      {
        id: 'L4_C3',
        levelId: 4,
        missionNumber: 3,
        type: 'dialogue',
        title: 'Asking for Medicine (ถามหาร้านขายยา)',
        thaiTitle: 'เบาะแสที่ 3: ร้านขายยาอยู่ใกล้ๆ แถวนี้ไหม',
        stimulusType: 'dialogue',
        stimulus:
          'Jack: "Is there a pharmacy near here?"\nWoman: "Yes, there is one across from the Hospital."',
        stimulusContext: 'Dialogue at Maple Street (บทสนทนา)',
        question: 'Where is the pharmacy located?',
        thaiQuestion: 'ผู้หญิงคนนี้บอกว่าร้านขายยาตั้งอยู่ที่ไหน?',
        options: [
          'Across from the Hospital',
          'Inside the School',
          'At the Cinema',
          'Far away in another town'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"Is there a pharmacy near here?"',
          '"Yes, there is one across from the Hospital."',
          '"Jack and Woman"',
          '"A pharmacy"'
        ],
        correctEvidence: 1,
        explanation: 'The woman replies that there is a pharmacy across from the Hospital.',
        thaiExplanation: 'ผู้หญิงตอบว่ามีร้านขายยาอยู่ตรงข้ามกับโรงพยาบาล ("across from the Hospital")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Across from (ตรงข้าม)',
            content: 'Across from = ตรงข้ามกับ, Near here = ใกล้ๆ แถวนี้',
            thaiContent: 'Across from มีความหมายเดียวกับคำว่า opposite แปลว่า ตรงข้าม'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Notice the woman\'s words: "...across from the Hospital."',
            thaiContent: 'ดูคำพูดของผู้หญิง: "across from the Hospital"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The pharmacy is across from the Hospital.',
            thaiContent: 'ตอบข้อ A: Across from the Hospital'
          }
        ],
        xpReward: 25,
        skillCategory: 'dialogue',
        mapHighlightNodeId: 'pharmacy'
      },
      {
        id: 'L4_C4',
        levelId: 4,
        missionNumber: 4,
        type: 'dialogue',
        title: 'Watching a Movie (อยากดูหนังไปที่ไหน)',
        thaiTitle: 'เบาะแสที่ 4: อยากดูหนังโรงต้องไปที่ไหน',
        stimulusType: 'dialogue',
        stimulus:
          'Anna: "Where can I watch a movie today?"\nBoy: "Go to the Cinema on High Street. It is between the Bookshop and the Restaurant."',
        stimulusContext: 'Dialogue at High Street (บทสนทนา)',
        question: 'Where can Anna watch a movie?',
        thaiQuestion: 'แอนนาสามารถไปดูหนัง (watch a movie) ได้ที่ไหน?',
        options: [
          'At the Cinema on High Street',
          'At the Train Station',
          'At the Police Station',
          'At the School'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"Where can I watch a movie today?"',
          '"Go to the Cinema on High Street."',
          '"It is between the Bookshop and the Restaurant."',
          '"Anna and Boy"'
        ],
        correctEvidence: 1,
        explanation: 'The boy tells Anna to go to the Cinema on High Street.',
        thaiExplanation: 'เด็กผู้ชายบอกให้แอนนาไปที่โรงภาพยนตร์บนถนน High Street ("Go to the Cinema on High Street.")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Cinema & Movie',
            content: 'Cinema = โรงภาพยนตร์, Watch a movie = ดูภาพยนตร์/ดูหนัง',
            thaiContent: 'cinema แปลว่า โรงภาพยนตร์ สำหรับดูหนัง'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "Go to the Cinema on High Street."',
            thaiContent: 'ดูประโยค: "Go to the Cinema on High Street."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'She can watch a movie at the Cinema on High Street.',
            thaiContent: 'ตอบข้อ A: At the Cinema on High Street'
          }
        ],
        xpReward: 25,
        skillCategory: 'dialogue',
        mapHighlightNodeId: 'cinema'
      },
      {
        id: 'L4_C5',
        levelId: 4,
        missionNumber: 5,
        type: 'dialogue',
        title: 'Asking for the Post Office (ถามทางไปไปรษณีย์)',
        thaiTitle: 'เบาะแสที่ 5: ที่ทำการไปรษณีย์อยู่ข้างๆ ธนาคาร',
        stimulusType: 'dialogue',
        stimulus:
          'Sam: "Excuse me, where is the Post Office?"\nOfficer: "Turn right at the corner of Park Avenue. The Post Office is next to the Bank."',
        stimulusContext: 'Dialogue at Park Avenue (บทสนทนา)',
        question: 'What is next to the Post Office according to the officer?',
        thaiQuestion: 'อะไรอยู่ติดกับที่ทำการไปรษณีย์ (next to the Post Office)?',
        options: ['The Bank', 'The River', 'The Hospital', 'The School playground'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Excuse me, where is the Post Office?"',
          '"Turn right at the corner of Park Avenue."',
          '"The Post Office is next to the Bank."',
          '"Sam and Officer"'
        ],
        correctEvidence: 2,
        explanation: 'The officer says: "The Post Office is next to the Bank."',
        thaiExplanation: 'ตำรวจบอกว่าที่ทำการไปรษณีย์อยู่ติดกับธนาคาร ("next to the Bank")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Next to & Bank',
            content: 'Next to = ติดกับ/ข้างๆ, Bank = ธนาคาร, Post office = ที่ทำการไปรษณีย์',
            thaiContent: 'next to the Bank แปลว่า อยู่ติดกับธนาคาร'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "The Post Office is next to the Bank."',
            thaiContent: 'ดูประโยค: "The Post Office is next to the Bank."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The Bank is next to the Post Office.',
            thaiContent: 'ตอบข้อ A: The Bank'
          }
        ],
        xpReward: 25,
        skillCategory: 'dialogue',
        mapHighlightNodeId: 'post_office'
      }
    ]
  },

  // ==========================================
  // LEVEL 5: READING INVESTIGATOR (นักสืบอ่านจับใจความ)
  // Beginner level: Short stories (3-4 sentences), asking Who, Where, What, Why
  // ==========================================
  {
    id: 5,
    code: 'LEVEL_5',
    title: 'LEVEL 5: READING INVESTIGATOR',
    thaiTitle: 'ด่านที่ 5: นักสืบอ่านจับใจความ (Short Reading Comprehension)',
    subtitle: 'ฝึกอ่านเรื่องสั้นภาษาอังกฤษ 3-4 ประโยค เพื่อตอบคำถามว่า ใคร ทำอะไร ที่ไหน เมื่อไหร่ (Who, What, Where)',
    storyScene:
      'We are getting closer! Read these short stories left by town residents to find secret details about the hidden map.',
    thaiStoryScene:
      'เราเข้าใกล้แผนที่สมบัติแล้ว! มาอ่านเรื่องสั้นภาษาอังกฤษที่ชาวเมืองบันทึกไว้ เพื่อจับใจความสำคัญและค้นหาคำตอบกันนะ',
    evidenceKeyName: 'กุญแจทองคำนักอ่านจับใจความ (Golden Reading Key)',
    evidenceKeyDescription: 'กุญแจทองคำนักอ่านจับใจความ: อ่านจับใจความเรื่องสั้นภาษาอังกฤษได้แม่นยำ',
    requiredMasteryScore: 80,
    challenges: [
      {
        id: 'L5_C1',
        levelId: 5,
        missionNumber: 1,
        type: 'reading',
        title: 'Saturday at the Park (วันเสาร์ที่สวนสาธารณะ)',
        thaiTitle: 'เบาะแสที่ 1: ทอมไปสวนสาธารณะในวันเสาร์',
        stimulusType: 'passage',
        stimulus:
          'Today is Saturday. Tom wakes up at eight o\'clock. He rides his bicycle to the Park to meet his dog. They run and play happily under the trees.',
        stimulusContext: 'Detective Diary Entry 1 (บันทึกนักสืบ)',
        question: 'Where does Tom ride his bicycle on Saturday morning?',
        thaiQuestion: 'ทอมขี่จักรยานไปที่ไหนในเช้าวันเสาร์?',
        options: ['To the Park', 'To the School', 'To the Hospital', 'To the Cinema'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Today is Saturday."',
          '"Tom wakes up at eight o\'clock."',
          '"He rides his bicycle to the Park to meet his dog."',
          '"Under the trees."'
        ],
        correctEvidence: 2,
        explanation: 'Tom rides his bicycle to the Park to meet his dog.',
        thaiExplanation: 'ทอมขี่จักรยานไปที่สวนสาธารณะ (the Park) เพื่อไปหาเจ้าสุนัขของเขา',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Bicycle & Park',
            content: 'Bicycle = จักรยาน, Park = สวนสาธารณะ, Saturday = วันเสาร์',
            thaiContent: 'Park แปลว่า สวนสาธารณะ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Sentence 3 says: "He rides his bicycle to the Park..."',
            thaiContent: 'ประโยคที่ 3 บอกว่า "rides his bicycle to the Park"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'Tom goes to the Park.',
            thaiContent: 'ตอบข้อ A: To the Park'
          }
        ],
        xpReward: 30,
        skillCategory: 'reading',
        mapHighlightNodeId: 'park'
      },
      {
        id: 'L5_C2',
        levelId: 5,
        missionNumber: 2,
        type: 'reading',
        title: 'Reading at the Library (อ่านหนังสือเตรียมสอบ)',
        thaiTitle: 'เบาะแสที่ 2: ลูซี่ไปอ่านหนังสือที่ห้องสมุด',
        stimulusType: 'passage',
        stimulus:
          'Lucy has an English test tomorrow. In the afternoon, she walks to the Library. She reads storybooks with her friend, May. The library is very quiet.',
        stimulusContext: 'Detective Diary Entry 2 (บันทึกนักสืบ)',
        question: 'Why does Lucy go to the Library?',
        thaiQuestion: 'ทำไมลูซี่จึงไปที่ห้องสมุดในตอนบ่าย?',
        options: [
          'To read storybooks for her test',
          'To buy ice cream and pizza',
          'To watch a scary movie',
          'To take a fast train'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"Lucy has an English test tomorrow."',
          '"In the afternoon, she walks to the Library."',
          '"She reads storybooks with her friend, May."',
          '"The library is very quiet."'
        ],
        correctEvidence: 2,
        explanation: 'Lucy goes to the Library to read storybooks because she has a test tomorrow.',
        thaiExplanation: 'ลูซี่ไปห้องสมุดเพื่ออ่านหนังสือ ("reads storybooks") เพราะมีสอบภาษาอังกฤษในวันพรุ่งนี้',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Test & Read',
            content: 'Test = การสอบ, Read storybooks = อ่านหนังสือนิทาน, Quiet = เงียบ',
            thaiContent: 'read storybooks แปลว่า อ่านหนังสือนิทาน'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Notice: "She reads storybooks with her friend, May."',
            thaiContent: 'ดูประโยค: "She reads storybooks with her friend, May."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'Lucy is at the library to read books, not to buy ice cream or watch movies.',
            thaiContent: 'ตอบข้อ A: To read storybooks for her test'
          }
        ],
        xpReward: 30,
        skillCategory: 'reading',
        mapHighlightNodeId: 'library'
      },
      {
        id: 'L5_C3',
        levelId: 5,
        missionNumber: 3,
        type: 'reading',
        title: 'Buying Food at the Supermarket (ซื้อของทำมื้อค่ำ)',
        thaiTitle: 'เบาะแสที่ 3: เดวิดซื้อของที่ซูเปอร์มาร์เก็ต',
        stimulusType: 'passage',
        stimulus:
          'David wants to cook dinner for his family. He walks to the Supermarket with a green bag. He buys fresh chicken, bread, and milk. Then he walks home happily.',
        stimulusContext: 'Detective Diary Entry 3 (บันทึกนักสืบ)',
        question: 'What does David buy at the Supermarket?',
        thaiQuestion: 'เดวิดซื้ออะไรบ้างที่ซูเปอร์มาร์เก็ต?',
        options: [
          'Fresh chicken, bread, and milk',
          'Pencils, notebooks, and rulers',
          'Medicine and bandages',
          'A new bicycle'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"David wants to cook dinner for his family."',
          '"He walks to the Supermarket with a green bag."',
          '"He buys fresh chicken, bread, and milk."',
          '"Then he walks home happily."'
        ],
        correctEvidence: 2,
        explanation: 'David buys fresh chicken, bread, and milk at the Supermarket.',
        thaiExplanation: 'เดวิดซื้อไก่สด ขนมปัง และนม ("fresh chicken, bread, and milk")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Chicken, Bread, Milk',
            content: 'Chicken = ไก่, Bread = ขนมปัง, Milk = นม, Buy = ซื้อ',
            thaiContent: 'chicken, bread, milk เป็นรายการอาหารที่ซื้อ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at sentence 3: "He buys fresh chicken, bread, and milk."',
            thaiContent: 'ดูประโยคที่ 3: "He buys fresh chicken, bread, and milk."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The food items purchased are chicken, bread, and milk.',
            thaiContent: 'ตอบข้อ A: Fresh chicken, bread, and milk'
          }
        ],
        xpReward: 30,
        skillCategory: 'reading',
        mapHighlightNodeId: 'supermarket'
      },
      {
        id: 'L5_C4',
        levelId: 5,
        missionNumber: 4,
        type: 'reading',
        title: 'A Visit to the Hospital (ไปหาหมอที่โรงพยาบาล)',
        thaiTitle: 'เบาะแสที่ 4: ปีเตอร์ไปหาหมอที่โรงพยาบาล',
        stimulusType: 'passage',
        stimulus:
          'Peter feels sick today. He has a fever and a cough. His father takes him to the Hospital. A kind doctor gives Peter medicine and tells him to drink warm water.',
        stimulusContext: 'Detective Diary Entry 4 (บันทึกนักสืบ)',
        question: 'Who gives Peter medicine at the Hospital?',
        thaiQuestion: 'ใครเป็นผู้ให้ยาแก่ปีเตอร์ที่โรงพยาบาล?',
        options: ['A kind doctor', 'A bus driver', 'An English teacher', 'A police officer'],
        correctAnswer: 0,
        evidenceOptions: [
          '"Peter feels sick today."',
          '"His father takes him to the Hospital."',
          '"A kind doctor gives Peter medicine and tells him to drink warm water."',
          '"Drink warm water."'
        ],
        correctEvidence: 2,
        explanation: 'A kind doctor gives Peter medicine at the Hospital.',
        thaiExplanation: 'คุณหมอใจดี (A kind doctor) เป็นผู้ให้ยาแก่ปีเตอร์ที่โรงพยาบาล',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Kind doctor',
            content: 'Kind = ใจดี, Doctor = คุณหมอ, Medicine = ยา',
            thaiContent: 'doctor แปลว่า หมอ หรือ แพทย์'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "A kind doctor gives Peter medicine..."',
            thaiContent: 'ดูข้อความ: "A kind doctor gives Peter medicine..."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The person who gives medicine in a hospital is the doctor.',
            thaiContent: 'ตอบข้อ A: A kind doctor'
          }
        ],
        xpReward: 30,
        skillCategory: 'reading',
        mapHighlightNodeId: 'hospital'
      },
      {
        id: 'L5_C5',
        levelId: 5,
        missionNumber: 5,
        type: 'reading',
        title: 'Holiday Trip (การเดินทางไปเที่ยว)',
        thaiTitle: 'เบาะแสที่ 5: เดินทางขึ้นรถไฟไปเที่ยวทะเล',
        stimulusType: 'passage',
        stimulus:
          'Emma and her family are going on holiday. They carry two big bags. They arrive at the Train Station at nine o\'clock to catch the blue train to the beach.',
        stimulusContext: 'Detective Diary Entry 5 (บันทึกนักสืบ)',
        question: 'Where does Emma\'s family go to catch the blue train?',
        thaiQuestion: 'ครอบครัวของเอ็มม่าไปที่ไหนเพื่อขึ้นรถไฟขบวนสีฟ้า?',
        options: [
          'To the Train Station',
          'To the School library',
          'To the Cinema hall',
          'To the Police Station'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"Emma and her family are going on holiday."',
          '"They carry two big bags."',
          '"They arrive at the Train Station at nine o\'clock to catch the blue train to the beach."',
          '"Two big bags"'
        ],
        correctEvidence: 2,
        explanation: 'Emma and her family arrive at the Train Station to catch the train.',
        thaiExplanation: 'ครอบครัวของเอ็มม่าไปที่สถานีรถไฟ (the Train Station) เพื่อขึ้นรถไฟไปทะเล',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Train station & Catch the train',
            content: 'Train station = สถานีรถไฟ, Catch the train = ขึ้นรถไฟทันเวลา',
            thaiContent: 'train station แปลว่า สถานีรถไฟ'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Sentence 3 says: "They arrive at the Train Station at nine o\'clock..."',
            thaiContent: 'ประโยคที่ 3 ระบุว่า "arrive at the Train Station"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'Trains depart from the Train Station.',
            thaiContent: 'ตอบข้อ A: To the Train Station'
          }
        ],
        xpReward: 30,
        skillCategory: 'reading',
        mapHighlightNodeId: 'train_station'
      }
    ]
  },

  // ==========================================
  // LEVEL 6: THE MISSING TREASURE MAP (ภารกิจกอบกู้แผนที่สมบัติ)
  // Beginner level: Clear clues pinpointing the Clock Tower in Town Square
  // ==========================================
  {
    id: 6,
    code: 'LEVEL_6',
    title: 'LEVEL 6: THE MISSING MAP FINAL BOSS',
    thaiTitle: 'ด่านที่ 6: ภารกิจกอบกู้แผนที่สมบัติ (The Missing Map Final)',
    subtitle: 'รวบรวมเบาะแสทั้งหมดเพื่อค้นหาว่าแผนที่สมบัติของเมืองถูกซ่อนไว้ที่ใด!',
    storyScene:
      'This is it, Detective! You have collected five Evidence Keys. Now read the final clues to locate the hidden treasure chest in English Town!',
    thaiStoryScene:
      'ถึงเวลาแล้ว ยอดนักสืบ! คุณสะสมกุญแจหลักฐานครบแล้ว ตอนนี้มาอ่านเบาะแสสุดท้ายเพื่อปลดล็อกหีบสมบัติและกอบกู้แผนที่ของเมืองกลับคืนมา!',
    evidenceKeyName: 'กุญแจเพชรแห่งยอดนักสืบ (Master Detective Diamond Key)',
    evidenceKeyDescription: 'กุญแจเพชรแห่งยอดนักสืบ: พิชิตปริศนาสุดท้ายและกอบกู้แผนที่สมบัติสำเร็จ',
    requiredMasteryScore: 80,
    challenges: [
      {
        id: 'L6_C1',
        levelId: 6,
        missionNumber: 1,
        type: 'final',
        title: 'Clue 1: Eliminate Places (ตัดสถานที่ที่ไม่เกี่ยวข้อง)',
        thaiTitle: 'ปริศนาข้อที่ 1: ตัดสถานที่ที่ไม่ใช่ทิ้งไป',
        stimulusType: 'secret_scroll',
        stimulus:
          'Secret Note 1: "The missing map is not in the hospital, and it is not in the school. It is hidden in an open place in the middle of town."',
        stimulusContext: 'Secret Scroll Note 1',
        question: 'Based on Secret Note 1, where is the map NOT located?',
        thaiQuestion: 'จากข้อความลับแผ่นที่ 1 แผนที่สมบัติไม่ได้อยู่ที่ไหน?',
        options: [
          'Not in the hospital or school',
          'Not in English Town',
          'Not outdoors',
          'Under the deep sea'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"The missing map is not in the hospital, and it is not in the school."',
          '"It is hidden in an open place in the middle of town."',
          '"Secret Note 1"',
          '"Middle of town"'
        ],
        correctEvidence: 0,
        explanation: 'The note clearly states the map is not in the hospital and not in the school.',
        thaiExplanation: 'ข้อความระบุชัดเจนว่า แผนที่ไม่ได้อยู่ในโรงพยาบาลและโรงเรียน ("not in the hospital, and it is not in the school")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Not in... (ไม่ได้อยู่ใน...)',
            content: 'Not in = ไม่ได้อยู่ใน, Middle of town = ใจกลางเมือง',
            thaiContent: 'not in แปลว่า ไม่ได้อยู่ข้างใน'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "not in the hospital, and it is not in the school."',
            thaiContent: 'ดูประโยค: "not in the hospital, and it is not in the school."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'We can eliminate the hospital and the school.',
            thaiContent: 'ตอบข้อ A: Not in the hospital or school'
          }
        ],
        xpReward: 35,
        skillCategory: 'reading',
        mapHighlightNodeId: 'town_square'
      },
      {
        id: 'L6_C2',
        levelId: 6,
        missionNumber: 2,
        type: 'final',
        title: 'Clue 2: The Tall Tower (หอนาฬิกาสูงตระหง่าน)',
        thaiTitle: 'ปริศนาข้อที่ 2: หอนาฬิกาใจกลางเมือง',
        stimulusType: 'secret_scroll',
        stimulus:
          'Secret Note 2: "Go to the center of English Town. You will see a tall Clock Tower. The treasure is very close to this tower."',
        stimulusContext: 'Secret Scroll Note 2',
        question: 'What landmark is the treasure very close to?',
        thaiQuestion: 'สมบัติซ่อนอยู่ใกล้กับสิ่งก่อสร้างสำคัญใด?',
        options: [
          'The tall Clock Tower',
          'The river bridge',
          'The cinema hall',
          'The train tracks'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"Go to the center of English Town."',
          '"You will see a tall Clock Tower."',
          '"The treasure is very close to this tower."',
          '"Secret Note 2"'
        ],
        correctEvidence: 2,
        explanation: 'Secret Note 2 says the treasure is very close to the tall Clock Tower.',
        thaiExplanation: 'ข้อความลับบอกว่าสมบัติอยู่ใกล้กับหอนาฬิกาสูง ("very close to this tower")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Clock Tower & Close to',
            content: 'Clock Tower = หอนาฬิกา, Close to = ใกล้กับ, Tall = สูง',
            thaiContent: 'Clock Tower แปลว่า หอนาฬิกา'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Notice: "The treasure is very close to this tower."',
            thaiContent: 'ดูประโยค: "The treasure is very close to this tower."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The landmark is the Clock Tower.',
            thaiContent: 'ตอบข้อ A: The tall Clock Tower'
          }
        ],
        xpReward: 35,
        skillCategory: 'reading',
        mapHighlightNodeId: 'clock_tower'
      },
      {
        id: 'L6_C3',
        levelId: 6,
        missionNumber: 3,
        type: 'final',
        title: 'Clue 3: The Golden Chest (หีบสมบัติสีทอง)',
        thaiTitle: 'ปริศนาข้อที่ 3: หีบสมบัติใต้หอนาฬิกา',
        stimulusType: 'secret_scroll',
        stimulus:
          'Secret Note 3: "The treasure map is locked inside a golden wooden chest. The chest is placed in the Town Square under the Clock Tower."',
        stimulusContext: 'Secret Scroll Note 3',
        question: 'Where is the golden chest placed?',
        thaiQuestion: 'หีบสมบัติสีทองถูกวางไว้ที่ไหน?',
        options: [
          'In the Town Square under the Clock Tower',
          'Inside a dark classroom',
          'Inside a train car',
          'Under the river water'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"The treasure map is locked inside a golden wooden chest."',
          '"The chest is placed in the Town Square under the Clock Tower."',
          '"Golden wooden chest"',
          '"Secret Note 3"'
        ],
        correctEvidence: 1,
        explanation: 'The chest is placed in the Town Square under the Clock Tower.',
        thaiExplanation: 'หีบสมบัติวางอยู่ในลานเมือง (Town Square) ใต้หอนาฬิกา (under the Clock Tower)',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Town Square & Chest',
            content: 'Town Square = ลานใจกลางเมือง, Chest = หีบสมบัติ, Under = ใต้',
            thaiContent: 'Town Square คือ จัตุรัสหรือลานใจกลางเมือง'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Sentence 2 states: "placed in the Town Square under the Clock Tower."',
            thaiContent: 'ดูประโยค: "placed in the Town Square under the Clock Tower."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The location is the Town Square under the Clock Tower.',
            thaiContent: 'ตอบข้อ A: In the Town Square under the Clock Tower'
          }
        ],
        xpReward: 35,
        skillCategory: 'reading',
        mapHighlightNodeId: 'clock_tower',
        expectedFinalNode: 'clock_tower'
      },
      {
        id: 'L6_C4',
        levelId: 6,
        missionNumber: 4,
        type: 'final',
        title: 'Clue 4: The Secret Lock (แม่กุญแจปริศนา)',
        thaiTitle: 'ปริศนาข้อที่ 4: ปลดล็อกด้วยกุญแจหลักฐาน',
        stimulusType: 'secret_scroll',
        stimulus:
          'Secret Note 4: "To open the chest, the detective must insert all five Evidence Keys. When all keys turn, the lock will click open!"',
        stimulusContext: 'Secret Scroll Note 4',
        question: 'How can the detective open the golden chest?',
        thaiQuestion: 'นักสืบสามารถเปิดหีบสมบัติสีทองได้อย่างไร?',
        options: [
          'Insert all five Evidence Keys',
          'Break the chest with a hammer',
          'Wait until next year',
          'Call the police car'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"To open the chest, the detective must insert all five Evidence Keys."',
          '"When all keys turn, the lock will click open!"',
          '"Secret Note 4"',
          '"Evidence Keys"'
        ],
        correctEvidence: 0,
        explanation: 'The detective must insert all five Evidence Keys to open the chest.',
        thaiExplanation: 'นักสืบต้องใส่กุญแจหลักฐานทั้ง 5 ดอก ("insert all five Evidence Keys") เพื่อเปิดหีบ',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Insert & Key',
            content: 'Insert = สอด/เสียบเข้าไป, Keys = กุญแจ, Open = เปิด',
            thaiContent: 'insert all five Evidence Keys แปลว่า ใส่กุญแจหลักฐานทั้ง 5 ดอก'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Look at: "...insert all five Evidence Keys."',
            thaiContent: 'ดูข้อความ: "...insert all five Evidence Keys."'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'Use all five keys collected from earlier levels.',
            thaiContent: 'ตอบข้อ A: Insert all five Evidence Keys'
          }
        ],
        xpReward: 35,
        skillCategory: 'reading',
        mapHighlightNodeId: 'clock_tower',
        expectedFinalNode: 'clock_tower'
      },
      {
        id: 'L6_C5',
        levelId: 6,
        missionNumber: 5,
        type: 'final',
        title: 'The Missing Map Recovered! (กอบกู้แผนที่สมบัติ)',
        thaiTitle: 'ปริศนาข้อที่ 5: แผนที่สมบัติของเมืองกลับคืนมาแล้ว!',
        stimulusType: 'secret_scroll',
        stimulus:
          'Victory Announcement: "Congratulations! You opened the chest at the Clock Tower. Inside is the Missing Map of English Town! You are now a Master Detective!"',
        stimulusContext: 'Victory Scroll (ประกาศชัยชนะ)',
        question: 'What is inside the opened chest at the Clock Tower?',
        thaiQuestion: 'อะไรอยู่ข้างในหีบสมบัติที่เปิดออกใต้หอนาฬิกา?',
        options: [
          'The Missing Map of English Town',
          'Only old newspaper papers',
          'A broken wooden watch',
          'Some heavy gray rocks'
        ],
        correctAnswer: 0,
        evidenceOptions: [
          '"Congratulations! You opened the chest at the Clock Tower."',
          '"Inside is the Missing Map of English Town!"',
          '"You are now a Master Detective!"',
          '"Victory Announcement"'
        ],
        correctEvidence: 1,
        explanation: 'Inside the opened chest is the Missing Map of English Town!',
        thaiExplanation: 'สิ่งที่อยู่ในหีบคือ แผนที่สมบัติของเมืองภาษาอังกฤษที่หายไป ("the Missing Map of English Town!")',
        hints: [
          {
            level: 1,
            type: 'Vocabulary',
            title: 'คำศัพท์: Missing Map & Master Detective',
            content: 'Missing Map = แผนที่ที่หายไป, Master Detective = ยอดนักสืบ',
            thaiContent: 'the Missing Map of English Town คือ แผนที่สมบัติของเมือง'
          },
          {
            level: 2,
            type: 'Evidence',
            title: 'จุดสังเกตในประโยค',
            content: 'Sentence 2 says: "Inside is the Missing Map of English Town!"',
            thaiContent: 'ดูประโยค: "Inside is the Missing Map of English Town!"'
          },
          {
            level: 3,
            type: 'Reasoning',
            title: 'สรุปคำตอบ',
            content: 'The Missing Map of English Town is recovered.',
            thaiContent: 'ตอบข้อ A: The Missing Map of English Town'
          }
        ],
        xpReward: 35,
        skillCategory: 'reading',
        mapHighlightNodeId: 'clock_tower',
        expectedFinalNode: 'clock_tower'
      }
    ]
  }
];

export const SAMPLE_LEADERBOARD: LeaderboardPlayer[] = [
  {
    id: 'lead_1',
    rank: 1,
    nickname: 'Detective Tanya (น้องธัญญา ป.6)',
    avatarId: 'avatar_sherlock',
    totalXP: 780,
    levelsCompleted: 6,
    readingAccuracy: 98,
    evidenceAccuracy: 96,
    detectiveRank: 'Master Detective'
  },
  {
    id: 'lead_2',
    rank: 2,
    nickname: 'Nong Kiet (น้องเกียรติ ป.6/1)',
    avatarId: 'avatar_owl',
    totalXP: 740,
    levelsCompleted: 6,
    readingAccuracy: 94,
    evidenceAccuracy: 92,
    detectiveRank: 'Master Detective'
  },
  {
    id: 'lead_3',
    rank: 3,
    nickname: 'Inspector Ploy (สารวัตรพลอย)',
    avatarId: 'avatar_cap',
    totalXP: 690,
    levelsCompleted: 6,
    readingAccuracy: 90,
    evidenceAccuracy: 90,
    detectiveRank: 'Master Detective'
  },
  {
    id: 'lead_4',
    rank: 4,
    nickname: 'Scout Win (สายสืบวิน)',
    avatarId: 'avatar_magnifier',
    totalXP: 510,
    levelsCompleted: 5,
    readingAccuracy: 88,
    evidenceAccuracy: 86,
    detectiveRank: 'Expert Detective'
  },
  {
    id: 'lead_5',
    rank: 5,
    nickname: 'Junior Fah (น้องฟ้า)',
    avatarId: 'avatar_compass',
    totalXP: 440,
    levelsCompleted: 4,
    readingAccuracy: 86,
    evidenceAccuracy: 84,
    detectiveRank: 'Field Detective'
  },
  {
    id: 'lead_6',
    rank: 6,
    nickname: 'Agent Beam (บีม ป.6)',
    avatarId: 'avatar_sherlock',
    totalXP: 375,
    levelsCompleted: 3,
    readingAccuracy: 84,
    evidenceAccuracy: 82,
    detectiveRank: 'Field Detective'
  },
  {
    id: 'lead_7',
    rank: 7,
    nickname: 'Rookie Ken (เคน นักสืบฝึกหัด)',
    avatarId: 'avatar_cap',
    totalXP: 290,
    levelsCompleted: 2,
    readingAccuracy: 82,
    evidenceAccuracy: 80,
    detectiveRank: 'Junior Detective'
  }
];

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'DIAG_1',
    skill: 'vocabulary' as const,
    question: 'Where do you go to buy medicine?',
    thaiQuestion: 'คุณไปซื้อยา (buy medicine) ที่สถานที่ใด?',
    options: ['Pharmacy (ร้านขายยา)', 'Cinema (โรงหนัง)', 'Park (สวนสาธารณะ)', 'Bank (ธนาคาร)'],
    correctAnswer: 0
  },
  {
    id: 'DIAG_2',
    skill: 'prepositions' as const,
    question: 'The library is ________ the school and the bank.',
    thaiQuestion: 'ห้องสมุดอยู่ ________ โรงเรียนและธนาคาร (อยู่ตรงกลาง)',
    options: ['between (ระหว่าง...กับ...)', 'under (ใต้)', 'in (ใน)', 'on (บน)'],
    correctAnswer: 0
  },
  {
    id: 'DIAG_3',
    skill: 'directions' as const,
    question: 'Walk straight and turn ________ at the corner.',
    thaiQuestion: 'เดินตรงไปแล้วเลี้ยว ________ ตรงหัวมุมถนน',
    options: ['left (ซ้าย)', 'yesterday (เมื่อวาน)', 'yellow (สีเหลือง)', 'cold (หนาว)'],
    correctAnswer: 0
  },
  {
    id: 'DIAG_4',
    skill: 'reading' as const,
    question: '"Tom reads books at the library." What does Tom do?',
    thaiQuestion: '"ทอมอ่านหนังสือที่ห้องสมุด" ทอมทำอะไร?',
    options: [
      'Reads books (อ่านหนังสือ)',
      'Plays football (เล่นฟุตบอล)',
      'Eats pizza (กินพิซซ่า)',
      'Sleeps in bed (นอนหลับ)'
    ],
    correctAnswer: 0
  }
];
