import image1 from '../assets/images/relationship.jpg';
import image2 from '../assets/images/calm.jpg';
import image3 from '../assets/images/career.jpg';

const Slides = [
  {
    id: '1',
    heading: 'SELF KNOWLEDGE',
    question: 'What is your relationship like with yourself?',
    subheading: '(Select all that apply)',
    image: image1,
    options: [
      'I want to know myself better',
      'I want to like myself more',
      'I want to overcome my past',
      'I feel secure in myself',
    ],
  },
  {
    id: '2',
    heading: 'CALM',
    question: 'How are you with being calm?',
    subheading: '(Select all that apply)',
    image: image2,
    options: [
      'I want to worry less',
      'I want to be more serene',
      'I want to sleep better',
      "I'm fine how I am",
    ],
  },
  {
    id: '3',
    heading: 'WORK',
    question: 'What more do you want from your career?',
    subheading: '(Select all that apply)',
    image: image3,
    options: [
      'A job to love',
      'Help with difficult colleagues',
      'To be more creative',
      'I have all I need',
    ],
  },
];

export default Slides;
