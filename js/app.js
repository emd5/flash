'use strict';

var leadership_cards = {
  deckName : 'Amazon Leader Principles',
  deckDescription : 'Cards to help educate on the Amazon leadership priciples',
  cards : [{
    cardAnswer : 'Customer Obsession',
    cardQuestion : 'Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Ownership',
    cardQuestion : 'Leaders are owners. They think long term and don’t sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say “that’s not my job".',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Invent and Simplify',
    cardQuestion : 'Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by “not invented here". As we do new things, we accept that we may be misunderstood for long periods of time.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Are Right, A Lot',
    cardQuestion : 'Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Learn and Be Curious',
    cardQuestion : 'Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Hire and Develop the Best',
    cardQuestion : 'Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. Leaders develop leaders and take seriously their role in coaching others. We work on behalf of our people to invent mechanisms for development like Career Choice.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Insist on the Highest Standards',
    cardQuestion : 'Leaders have relentlessly high standards - many people may think these standards are unreasonably high. Leaders are continually raising the bar and drive their teams to deliver high quality products, services and processes. Leaders ensure that defects do not get sent down the line and that problems are fixed so they stay fixed.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Think Big',
    cardQuestion : 'Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Bias for Action',
    cardQuestion : 'Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Frugality',
    cardQuestion : 'Accomplish more with less. Constraints breed resourcefulness, self-sufficiency and invention. There are no extra points for growing headcount, budget size or fixed expense.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Earn Trust',
    cardQuestion : 'Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders do not believe their or their team’s body odor smells of perfume. They benchmark themselves and their teams against the best.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Dive Deep',
    cardQuestion : 'Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ. No task is beneath them.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Have Backbone; Disagree and Commit',
    cardQuestion : 'Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Deliver Results',
    cardQuestion : 'Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.',
    cardViews : '0',
    cardCorrect : '0'
  }]
}
var aws_card_information = {
  deckName : 'AWS Cards',
  deckDescription : 'Cards to help understand the different AWS tools',
  cards: [{
    cardAnswer : 'EC2',
    cardQuestion :  'Amazon Virtual Servers	',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'IAM',
    cardQuestion :  'Users, Keys and Certs',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'S3',
    cardQuestion :  'Amazon Unlimited FTP Server',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'VPC',
    cardQuestion :  'Amazon Virtual Colocated Rack',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Lambda',
    cardQuestion :  'AWS App Scripts',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'API Gateway',
    cardQuestion :  'API Proxy',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'RDS',
    cardQuestion :  'Amazon SQL',
    cardViews : '0',
    cardCorrect : '0'
  },{
    cardAnswer : 'Route53',
    cardQuestion :  'Amazon DNS + Domains',
    cardViews : '0',
    cardCorrect : '0'
  }]
}
var amazon_study_cards = [leadership_cards, aws_card_information];

//Decks is the array that holds all of the decks
var allDecks = [];

//Constructor Function for Cards
function Card(cardQuestion, cardAnswer, cardViews = 0, cardCorrect = 0) {
  this.cardQuestion = cardQuestion;
  this.cardAnswer = cardAnswer;
  this.cardViews = cardViews;
  this.cardCorrect = cardCorrect;

  this.incrementCardViews = function(){
    this.cardViews++;
  };

  this.incrementCardCorrect = function(){
    this.cardCorrect++;
  };
}


//Constructor Function for Decks
function SingleDeck(deckName, deckDescription) {
  console.log(typeof(deckName));
  this.deckName = deckName;
  this.deckDescription = deckDescription;
  this.deckCards = [];

  this.addCardtoDeck = function(cardQuestion, cardAnswer, cardViews = 0, cardCorrect = 0){
    var addNewCard = new Card(cardQuestion, cardAnswer, cardViews, cardCorrect);
    this.deckCards.push(addNewCard);
  };

}
console.log(aws_card_information.deckName)
//Creating the AWS object
var awsDeck = new SingleDeck(aws_card_information.deckName, aws_card_information.deckDescription);

//Adding all the cards to the AWS Deck
let numOfCards = aws_card_information.cards.length;
for(let i = 0; i < numOfCards; i++){
  let cardQuestion = aws_card_information.cards[i].cardQuestion;
  let cardAnswer = aws_card_information.cards[i].cardAnswer;
  let cardViews = aws_card_information.cards[i].cardViews;
  let cardCorrect = aws_card_information.cards[i].cardCorrect;
  awsDeck.addCardtoDeck(cardQuestion, cardAnswer, cardViews,cardCorrect);
}
console.log(awsDeck);
