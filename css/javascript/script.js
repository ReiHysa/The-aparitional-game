
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text 
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
		text: 'Your vision is blurry.....you wake up in a new but familiar setting for some reason. The colours settle and you realise you are in a hospital bed....',
		options: [
			{
				text: 'Leave the room',
				nextText: 2
			},
			{
				text: 'Stay in bed',
				nextText: 3
			},
		]
	},
	{
		id: 2,
			text: 'as you get up and leave the door you feel a sense of dread. Like this was not part of the script... You open the door and notice that your vision becomes blurry....No. More like this section almost has dropped in quality. You see in the shadows a moving darkness coming towards you',
		options: [
			{
				text: 'Try to run',
				nextText: 5
			},
			{
				text: 'Try to Scream',
				nextText: 5
			},
			{
				text: 'Try to fight',
				nextText: 5
			}
		]
		
	},
	{
		id:5,
		text: 'Before you are able to make that move the shadow instantly engulfs you. You get a familiar feeling overwhelm you as you slowly lose the life within you. As if something similar has happened before.',
		options: [
			{
				text: 'restart game?',
				setState: { truth: true},
				nextText: 3,
			}
		]
	},
	{
		id: 3,
		text: 'The nurse walks in as you decided to lay in bed and not leave the room. She sees you and notices that you are awake. "How are you? you have been asleep for a very long time" she says. You go to reply but realise your memory is all gone. "Oh no you seem to have forgotten what happened to you, you were badly attacked by gang members on the way to see your wife, we do not know who she is, will you find her for us?"',
		options: [
			{
				text: 'Decide to find your wife',
				nextText: 6,
				setState: { wifeArc: true},
			},
			{
				text: 'Decide to find the gang members',
				nextText: 7,
				setState: { gangArc: true},
			}
		]
	},
	{
		id: 6,
		text: '"So you going to go find your wife? Thats amazing news i am sure she is worried sick about you". The weird nurse leaves the room with a devlish smile. You get up.',
		options: [
			{
				text: 'Explore the room',
				nextText: 8,
			},
			{
				text: 'Leave the hospital',
				nextText: 12,
			},
			{
				text: 'Explore the hospital',
				requiredState: (currentState) => currentState.truth,
				nextText: 10,
			}
		]
	},
	{
		id: 8,
		text: 'As you explore the room you find a little mecahnical box which would not normally be found in a hospital. You try to open it to no avail. What do you do?',
		options: [
			{
				text: 'Take the box',
				setState: { mechanicalBox: true},
				nextText: 11,
			},
			{
				text: 'Leave the box',
				nextText: 11,
			}
		]
	},
	{
		id: 11,
		text: 'After exploring the room you decide to leave the room and go find your wife. As you leave the hospital you look back at it and wonder why it seemed so weird in there.',
		options: [
			{
				text: 'Go find your wife',
				nextText: 12,
			},
			{
				text: 'Explore the Hospital',
				nextText: 13,
				requiredState: (currentState) => currentState.truth,
			}
		]
	},
	{
		id: 12,
		text: 'You go explore the local market seeing if anybody will help you. You see a merchant that seemed to look at you weirdly. What do you do?',
		options: [
			{
				text: 'Show the merchant the box you found',
				requiredState: (currentState) => currentState.mechanicalBox,
				nextText: 14,
			},
			{
				text: 'Who you looking at!',
				nextText: 15,
			},
			{
				text: 'Talk to the merchant',
				nextText: 16,
			},
			
		]
	},
	{
		id: 14,
		text: 'wow That is an amazing box you have there....Filled with many secrets. I can open it for you as long as you promise me one thing. Do not go find them. That is what they want',
		options: [
			{
				text: 'yes',
				nextText: 17,
				setState: { mechanicalBox: false, microChip: true},
			},
			{
				text: 'no',
				nextText: 45,
				requiredState: (currentState) => currentState.wifeArc,
			},
			{
				text: 'no',
				nextText: 45,
				requiredState: (currentState) => currentState.gangArc,
			}
		]
	},
	{
		id: 17,
		text: '"Amazing news. With me opening this you will be potentially unlocking the secrets of this world....if you make the right choice that is" Says the merchant. As he opens the box a green metalic microchip is revealed to you. You take the chip and thank him. What do you do?',
		options: [
			{
				text: 'go back to the hospital, something felt off there',
				nextText: 10,
			},
			{
				text: 'Ignore the merchant and find your wife',
				nextText: 45,
				requiredState: (currentState) => currentState.wifeArc,
			},
			{
				text: 'Ignore the merchant and go find the gang',
				nextText: 45,
				requiredState: (currentState) => currentState.gangArc,
			}
		]
	},
	{
		id: 10,
		text: 'you go explore the hospital. It looks different to when you left before, almost fictional. A sense of dread befalls you as you realise that you have had this feeling before. You see a shadow moving towards you....',
		options: [
			{
				text: 'Try to fight the creature',
				nextText: 21,
			},
			{
				text: 'Go into the door next to you and lock it',
				nextText: 22,
			},
			{
				text: 'Run Away',
				nextText: 23,
			}
		]
	},
	{
		id: 21,
		text: 'As you go to strike the shadow you realise your mistake. Your fist phases through it as it begins to engulf you. You have had this exact feeling before as you dissolve into nothingness',
		options: [
			{
				text: 'restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 22,
		text: 'You open the door and lock it instantly. Although it is a shadow it cannot seem to enter this particular room. You slowly turn around and notice a bunch of computers. However, there is no keyboard but just one small slot',
		options:[
			{
				text: 'Insert the microchip into the slot',
				requiredState: (currentState) => currentState.microChip,
				nextText: 24,
			},
			{
				text: 'try to use the mechanical box in some way',
				requiredState: (currentState) => currentState.mechanicalBox,
				nextText: 25,
			},
			{
				text: 'Try to leave the room',
				nextText: 26,
			}
		]
	},
	{
		id: 26,
		text: 'As you open the door the shadow figure is still there. It instantly engulfs you with darkness. This weird cold feeling is oddly familair as you fall into absolute darkness.',
		options: [
			{
				text: 'restart the game',
				nextText: -1,
			}
		]
	},
	{
		id: 25,
		text: 'As you try to use the mechnical box into the small slot, a bolt of electricity is picked up and transfered through the metalic substance. As the box is metallic it conducts electricity and fries your brain. In an instant you are in absolute darkness, being welcomed by an oddly familair feeling greeting you once again',
		options:[
			{
				text: 'restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 24,
		text: 'As you insert the chip the room distorts and changes. You are no longer in a empty hospital room but in a ship like aesthetic. The information on the computer begins to load up. It lets you know that the world you currently were living in was a simulation of real life people and the real world. The aim of the aliens on the ship were to find your wife who has the map leading them to the hidden planet known as "GAIA". This planet is where your real body stays and you realise that you are nothing but a spiritual enigram of this being. A copy. Not real. What do you do?',
		options:[
			{
				text: 'press the destruct button',
				nextText: 27,
			},
			{
				text: 'Work alongside the aliens. You want a real body',
				nextText: 28,
			}
		]
	},
	{
		id: 27,
		text: 'You accept that you are not real. And if you leave it how it is now they will eventually be able to enter this room and start everything from the beginning. You are an outlier, an anomanly. There is no saying that this series of events will ever happen again. You are left with no choice but to press the destruct button. This button slowly removes your whole data from their system, making it so they can never get a copy of it again. You know this is the right choice. The planet GAIA. Your home. Filled to the brim with real people cannot be put in danger for your own selfishness. Your body and mind slowly cripples away, but this time a new feeling of darkness engulfs you. This feeling is new but much more warm and welcoming. You welcome this darkness with a smile as if greeting an old friend knowing that you are leaving this plane of existence a hero. The darkness turns into light. Well done! You got the Heroic Ending! Play again?',
		options: [
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 28,
		text: 'Why should I not be real. I have feelings. I have emotions. I deserve to exist. You walk away from the computer and open the door. Behind the door is no longer a shadow creature but a demonic being withlong sharp fangs and bloodshot eyes. Before they attack you say "I have come to bargain". The being instantly stops and glares at you. It replies by promising to give you a real body if you can find and reveal the real location of GAIA. Working alongside each other you find the women known as "wife" and receive the coordinates for GAIA. Before giving it to the aliens you ask them to uphold their end of the deal by giving you a body. The demonic being puts you in a trance as you wake up in a new unrecognisable body. Finally, you feel free and ready to exist. You give them the coordinates of GAIA. The demonic beings all share a grin as reality begins to tear and fall apart. They fooled you. "A mere copy of a human thought they could bargain with us, how foolish". The world begins to slowly disintergrate as you realise you had never left the simulation. Darkness begins to take hold of you as you try to fight to try cling into life. But it is no use. You die knowing that the whole human race is going to die due to your ignorance. Congratualtions! You got they betrayal Ending! Play again?',
		options: [
			{
				text: 'Restart Game',
				nextText: -1,
			}
		]
	},
	{
		id: 23,
		text: ' As you turn around to try run away you realise you made a mistake. The shadow was much faster then you and instantly catches up to you. With one last breath the shadow engulfs you. The feeling is oddly familiar as the light slowly escapes you. Giving you a feeling of a resetting.',
		options:[
			{
				text: 'Restart the game',
				nextText: -1,
			}
		]
	},
	{
		id: 7,
		text: '"You are going to go find the gang members? I would not recommend that it is very dangerous." Says the nurse. You decide to ignore her and say you want to find out why what happened ended up happening. She reluctantly turns around with a devilish smear. She seems agitated by that news but you choose to ignore it.',
		options: [
			{
				text: 'Go find the Gang members',
				nextText: 12,
			},
			{
				text: 'Explore the Hospital',
				nextText: 10,
				requiredState: (currentState) => currentState.truth,
			}
		]
	},
	{
		id: 16,
		text: 'You walk towards the merchant hoping that he will be able to help you in some sort of way. The merchant smiles at you and asks how he can help you',
		options: [
			{
				text: 'Have you heard of the gang members?',
				requiredState: (currentState) => currentState.gangArc,
				nextText: 29,
			},
			{
				text: 'Do you know my wife?',
				requiredState: (currentState) => currentState.wifeArc,
				nextText: 30,
			},
		]
	},
	{
		id: 29,
		text: 'The gang members? of course I have heard of them. They play a very important role within this world. If you want to know where to find a member you must travel through the alley behind the bread shop. There is where you will find your answers.',
		options: [
			{
				text: 'Go to the alley',
				nextText: 31,
			},
			{
				text: 'Ignore and search yourself',
				nextText: 32,
			}
		]
	},
	{
		id: 32,
		text: 'You aimlessly search for the gang but find nothing. You ask as many people for help but no one is willing to help you. After a few days of searching you decide to go to the alley anyway. But at this point all you see is a splatter of blood covered within tape from the police. Whatever happened here must have occured a few days ago. Turns out you were too late. You go back to the market to find the merchant but he is no where to be seen. Days turns to months, and months turns to years. But nothing appears to you as you aimlessly wonder. You decide to keep on walking untill you find something. But nothing happens. Your feet are numb from all the walking. You fall to the ground and finally admit to yourself that you made a mistake in not following the merchants order. The pain gets the better of you as you close your eyes. If only there was a way to redo everything....Darkness engulfs you with a familiar feeling, as if death has welcomed you before....Congratualions! You Got the Wanderer Ending. Try again?',
		options: [
			{
				text: 'Restart the game',
				nextText: -1,
			}
		]
	},
	{
		id: 31,
		text: 'You go towards the alley that the merchant spoke about. As you enter you find a splatter of blood on the walls and an small injured woman on the floor.',
		options:[
			{
				text: 'Help her',
				nextText: 33,
			},
			{
				text: 'Ignore her',
				nextText: 35,
			}
		]
	},
	{
		id: 33,
		text: 'You go and help patch her up. You give her food and water and makes sure you are okay. She looks at you and thanks you. You ask her about the gang and she responds by saying she is a member. Since you helped her she offers to tell you where they are. You agree. You find out that there is a secret entrance just up ahead if you want to meet the head of the gang. Before that she offers a medallion that will help you.',
		options: [
			{
				text: 'Take the medallion',
				nextText: 35,
				setState: { medal: true, meeting: true},
			},
			{
				text: 'leave the medallion',
				nextText: 35,
				setState: {meeting: true},
			}
		]
	},
	{
		id: 35,
		text: 'As you go down the end of the alley you see a group of people at the end of the alley with the marks on the shirt suggesting they are part of the gang.',
		options:[
			{
				text: 'Go to them',
				nextText: 36,
			},
			{
				text: 'Ignore them and go towards the secret entrance',
				nextText: 37,
				requiredState: (currentState) => currentState.meeting,
			}
		]
	},
	{
		id:36,
		text: 'As you walk towards the gang members you see them staring at you. Before you can say anything they crowd you. You claim that you want to know why they attacked you and what seems to be the person in charge claims "We do not know who you are, but if we attacked you before then it is because you are a little bitch". Offended by the statement you try to argue back but before you could do that you feel a warm sense on your back. One of the members had circled behind you and stabbed you. Before you can react you feel multiple different warm spots as they all begin to stab you. You fall to the ground filled with a pool of your own blood. The light disappears as you realise that you are about to die. A familiar feeling resurfaces inside as the shadow engulfs you, taking away your life.',
		options:[
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 37,
		text: 'You find the secret entrance and open it. You walk down a spiral staircase with portraits of these familiar demonic beings. As you reach the bottom you see a group of humans with clothing you recognise. The committee turn around to see you and immediately ask the guards to seize you.',
		options:[
			{
				text: 'Show medallion',
				nextText: 38,
				requiredState: (currentState) => currentState.medal,
			},
			{
				text: 'Ask why they tried killing you before',
				nextText: 39,
			},
			{
				text: 'Fight back',
				nextText: 40,
			}
		]
	},
	{
		id: 38,
		text: 'They all stop and realise you are safe. You ask them why they attacked you before. Bewildered by that news they asked who you are. After informing them they ask if we came from the hospital. That is when they realised what has happened. They let you know that the hospital is a centre for evil beings and they are manipulating the people in this realm to find their own answers. Since we came from the hospital and managed to escape something they clearly want something from me in particular. They then give us two options, join them or die.',
		options:[
			{
				text: 'Join them',
				nextText: 41,
			},
			{
				text: 'Refuse',
				nextText: 42,
			}
		]
	},
	{
		id: 41,
		text: 'You agree to join them. They welcome you as if you were already part of their family. You live and learn within this group. After many years of living together with the gang members you finally agree to create a plan to break into the hospital and destroy it. You prepare all the relevant and important equipment and break in. Instantly a familiar feeling creeps up your spine as you make everyone ready up. The shadow begins to attack killing a few gang members. However, the shadow stops after having receieved plenty of shots. This is your chance. Placing the light bomb which was created specifically for these creatures. Killing it. Knowing more will be coming you enter different rooms and place explosives inside. You meet up with your family and you all turn around seeing a herd of shadow creatures chasing you. As you manage to leave the building the leader detonates the bombs, completely destroying it. You are finally free. Free to live with the people who took you in. As everyone leaves you feel a familiar feeling and turn around.....but there was nothing there. This sense of unease may never leave, but you are able to live with your life truly now. Congratulations! You got the family ending. Wanna try find the other endings?',
		options:[
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 45,
		text: 'You ignore the merchant and aimlessly search. But you find nothing. After many years of searching you are left with nothing but a useless microchip. You find a computer and place the chip inside but all that is stored inside is a bunch of random notes that do not make any sense. With no answers to anything you keep on searching but find nothing. Eventually after months of searching your legs give out. You give up on your search and live in a house outside the city. In a quiet place. You think back to all the decisions that you made and how you would have changed them. You look at a piece of rope stashed in your cupboard. With nothing to live for, no answers and so lonely. You go and tie the rope. From the outside of the house....all you could hear was a loud snapping sound. And then silence except for the quiet sounds of a swinging rope. Congratualtions! You finished the game! You got the bad ending :( Find the other endings?',
		options: [
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 42,
		text: 'Refusing to join them they all look upset. You know what they are about to do and pointlessly struggle to no avail. You feel a warm sharp pain in your stomach. Realsing that they have stabbed you, you fall to the ground in a pool of your own blood and guts. Darkenss swarms you and with that, your life ends there. You died, try again?',
		options:[
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 39,
		text: 'They ignore your comment and the guards instantly grab you. They refuse to listen to what you have to say and throw you in prison. You stay down there for days with no food or water. Dying from malnutrition, slowly and painfully. You regret the choices you made until that point. If only you could of changed them. You died',
		options: [
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 40,
		text: 'They overpower you and they refuse to listen to what you have to say and throw you in prison. You stay down there for days with no food or water. Dying from malnutrition, slowly and painfully. You regret the choices you made until that point. If only you could of changed them. You died',
		options: [
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 30,
		text: '"Your wife? I think I know who it is. If you really want to locate her then here is a map. My only requirement is that you ask her for the coordinates. That is all',
		options:[
			{
				text: 'Agree',
				nextText: 46,
			},
			{
				text: 'refuse',
				nextText: 45,
			}
		] 
	},
	{
		id: 46,
		text: 'Using the map you find the location of your wife. The journey takes a few hours but you finally find her in the home. You see her through the window and see she has light brown hair. Humming a familiar melody which makes you feel warm, happy and comfortable. You go to the door',
		options:[
			{
				text:'Knock on the door',
				nextText: 47,
			},
			{
				text:'Leave',
				nextText: 48,
			}
		]
	},
	{
		id: 47,
		text: 'You knock in a melodic tone. As she answers the door you see your wife. She looks at you strangely and says "Welcome home". You calmly walk in having finally found her. You then recall what the merchant asked you to do.',
		options:[
			{
				text: 'Ask for Coordinates',
				nextText: 49,
			},
			{
				text: 'Do not ask for coordinates',
				nextText: 50,
			}
		]
	},
	{
		id: 49,
		text: 'You ask her for the coordinates. Her face seems to go dark. She says that if I truly want to know it then she will say it. The language she says it in is familiar but you cannot translate it. What does coordinates even mean? I do not understand. Before you can ask, a familiar feeling creeps up on you, as you hear a light chuckle. Before you can turn around everything goes dark, like it has all been shut down....what just happened? Congratulations! You got the WTF ending! Try find the other endings!',
		options: [
			{
				text: 'Restart game!',
				nextText: -1,
			}
		]
	},
	{
		id: 50,
		text: 'You decide to not ask for the coordinates. Who cares about what that crazy old merchant had to say. You live the rest of your life in that house, having multiple kids and a whole family. You had the most joy you could ever imagine, but there was a weird feeling in the back of your mind. Like this is too good to be true. But ignoring that you decide to just be happy in the moment. And when the time finally came, you welcomed death like an old friend through old age. Time flew by so quickly, like life was not even real. Congratulations! You got the Happy ending! Try find the other endings?',
		options:[
			{
				text: 'Restart game!',
				nextText: -1,
			}
		]
	},
	{
		id: 48,
		text: 'You decide to leave her due to a feeling deep within your stomach. You want to move on with your life...It is better this way for both of us you think. You move into the city, find a job and live a comfortable life. You never find a new wife or have children, but through your work and efforts you became a much loved person within your area. You are happy but a feeling of emptiness sits within your stomach. As if you could have been much happier.....Congratulations! You got the neutral ending! Try find the other endings?',
		options: [
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	},
	{
		id: 15,
		text: 'The merchant looks at you with anger. "Who do you think you are talking to" He says. Before you can answer he swiftly stabs you in the throat in the middle of the market. Gasping for air you fall on the floor. "Next time learn how to speak someone okay? See you next time prick". You died, Restart?',
		options: [
			{
				text: 'Restart game',
				nextText: -1,
			}
		]
	}


]

startGame()