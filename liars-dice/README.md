# About
One Shot Kata done for practice and fun with a beer on the side.
Goals:
- Use event sourcing as much as possible and minimize state
- SOLID
- Separate code execution and data
- Write unit tests as you go
- Do not start coding before you understand the rules and consider some options.

Things that should be improved:
- The two "AI"s that battle are done crude - the results are always the same which is great for development and testing but is no fun.
- There is a missing validation that ensures that the bets are higher than the previous one.


# Liars Dice Kata

Round:
1. Each player has 5 dice.
2. Begin from the last winner. First round player is random.
3. All dice are rolled and hidden.
4. The current player makes a bet i.e. 3 4s, 5, 6s etc. This means there must be at least 3 dice having 4. 1s are wild - can represent any number, unless first player in the round  used a 1
5. The following player can Up the bet or call higher. Up the bet means have more dice of the same value or same amount of dice with higher value
6. on Liar all bets are lifted and the winner wins 1 die from the last player.
7. First person to win 3 rounds is the winner.

Game:
- 2-8 Players
- Simple AI

Game plays with 2 AI's one confusingly named player.
The intent is that if it should be a playable game the player AI should be replaced with console inputs + Logs


# Want to try it for yourself ? 
Set a time limit on yourself. In my case it was 4.5h with breaks interruptions and beer
Set what you want to practice. In my case it was diagraming, event sourcing and SOLID.
Adjust the rules as you see fit but do it before you begin coding.