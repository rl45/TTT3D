/**
 * Assignment #4.
 * This program will create a Tic-Tac-Toe program on a 4x4x4 three dimensional board layout.The computer is to play ``intelligently'' and it should beat most naive humans.
 * 
 * Authors: Raymond Lee (rlee24@ucsc.edu) 
 *
 */
import java.util.*;
public class TTT3D
{
    static Random rndm = new Random();
    static final int[][][] lines = {
            {{0,0,0},{0,0,1},{0,0,2},{0,0,3}},  //lev 0; row 0   rows in each lev
            {{0,1,0},{0,1,1},{0,1,2},{0,1,3}},  //       row 1     
            {{0,2,0},{0,2,1},{0,2,2},{0,2,3}},  //       row 2     
            {{0,3,0},{0,3,1},{0,3,2},{0,3,3}},  //       row 3     
            {{1,0,0},{1,0,1},{1,0,2},{1,0,3}},  //lev 1; row 0     
            {{1,1,0},{1,1,1},{1,1,2},{1,1,3}},  //       row 1     
            {{1,2,0},{1,2,1},{1,2,2},{1,2,3}},  //       row 2     
            {{1,3,0},{1,3,1},{1,3,2},{1,3,3}},  //       row 3     
            {{2,0,0},{2,0,1},{2,0,2},{2,0,3}},  //lev 2; row 0     
            {{2,1,0},{2,1,1},{2,1,2},{2,1,3}},  //       row 1     
            {{2,2,0},{2,2,1},{2,2,2},{2,2,3}},  //       row 2       
            {{2,3,0},{2,3,1},{2,3,2},{2,3,3}},  //       row 3     
            {{3,0,0},{3,0,1},{3,0,2},{3,0,3}},  //lev 3; row 0     
            {{3,1,0},{3,1,1},{3,1,2},{3,1,3}},  //       row 1 
            {{3,2,0},{3,2,1},{3,2,2},{3,2,3}},  //       row 2       
            {{3,3,0},{3,3,1},{3,3,2},{3,3,3}},  //       row 3           
            {{0,0,0},{0,1,0},{0,2,0},{0,3,0}},  //lev 0; col 0   cols in each lev
            {{0,0,1},{0,1,1},{0,2,1},{0,3,1}},  //       col 1    
            {{0,0,2},{0,1,2},{0,2,2},{0,3,2}},  //       col 2    
            {{0,0,3},{0,1,3},{0,2,3},{0,3,3}},  //       col 3    
            {{1,0,0},{1,1,0},{1,2,0},{1,3,0}},  //lev 1; col 0     
            {{1,0,1},{1,1,1},{1,2,1},{1,3,1}},  //       col 1    
            {{1,0,2},{1,1,2},{1,2,2},{1,3,2}},  //       col 2    
            {{1,0,3},{1,1,3},{1,2,3},{1,3,3}},  //       col 3    
            {{2,0,0},{2,1,0},{2,2,0},{2,3,0}},  //lev 2; col 0     
            {{2,0,1},{2,1,1},{2,2,1},{2,3,1}},  //       col 1    
            {{2,0,2},{2,1,2},{2,2,2},{2,3,2}},  //       col 2    
            {{2,0,3},{2,1,3},{2,2,3},{2,3,3}},  //       col 3    
            {{3,0,0},{3,1,0},{3,2,0},{3,3,0}},  //lev 3; col 0     
            {{3,0,1},{3,1,1},{3,2,1},{3,3,1}},  //       col 1
            {{3,0,2},{3,1,2},{3,2,2},{3,3,2}},  //       col 2
            {{3,0,3},{3,1,3},{3,2,3},{3,3,3}},  //       col 3
            {{0,0,0},{1,0,0},{2,0,0},{3,0,0}},  //cols in vert plane in front
            {{0,0,1},{1,0,1},{2,0,1},{3,0,1}},
            {{0,0,2},{1,0,2},{2,0,2},{3,0,2}},
            {{0,0,3},{1,0,3},{2,0,3},{3,0,3}},
            {{0,1,0},{1,1,0},{2,1,0},{3,1,0}},  //cols in vert plane one back
            {{0,1,1},{1,1,1},{2,1,1},{3,1,1}},
            {{0,1,2},{1,1,2},{2,1,2},{3,1,2}},
            {{0,1,3},{1,1,3},{2,1,3},{3,1,3}},
            {{0,2,0},{1,2,0},{2,2,0},{3,2,0}},  //cols in vert plane two back
            {{0,2,1},{1,2,1},{2,2,1},{3,2,1}},
            {{0,2,2},{1,2,2},{2,2,2},{3,2,2}},
            {{0,2,3},{1,2,3},{2,2,3},{3,2,3}},
            {{0,3,0},{1,3,0},{2,3,0},{3,3,0}},  //cols in vert plane in rear
            {{0,3,1},{1,3,1},{2,3,1},{3,3,1}},
            {{0,3,2},{1,3,2},{2,3,2},{3,3,2}},
            {{0,3,3},{1,3,3},{2,3,3},{3,3,3}},
            {{0,0,0},{0,1,1},{0,2,2},{0,3,3}},  //diags in lev 0
            {{0,3,0},{0,2,1},{0,1,2},{0,0,3}},
            {{1,0,0},{1,1,1},{1,2,2},{1,3,3}},  //diags in lev 1
            {{1,3,0},{1,2,1},{1,1,2},{1,0,3}},
            {{2,0,0},{2,1,1},{2,2,2},{2,3,3}},  //diags in lev 2
            {{2,3,0},{2,2,1},{2,1,2},{2,0,3}},
            {{3,0,0},{3,1,1},{3,2,2},{3,3,3}},  //diags in lev 3
            {{3,3,0},{3,2,1},{3,1,2},{3,0,3}},
            {{0,0,0},{1,0,1},{2,0,2},{3,0,3}},  //diags in vert plane in front
            {{3,0,0},{2,0,1},{1,0,2},{0,0,3}},
            {{0,1,0},{1,1,1},{2,1,2},{3,1,3}},  //diags in vert plane one back
            {{3,1,0},{2,1,1},{1,1,2},{0,1,3}},
            {{0,2,0},{1,2,1},{2,2,2},{3,2,3}},  //diags in vert plane two back
            {{3,2,0},{2,2,1},{1,2,2},{0,2,3}},
            {{0,3,0},{1,3,1},{2,3,2},{3,3,3}},  //diags in vert plane in rear
            {{3,3,0},{2,3,1},{1,3,2},{0,3,3}},
            {{0,0,0},{1,1,0},{2,2,0},{3,3,0}},  //diags left slice      
            {{3,0,0},{2,1,0},{1,2,0},{0,3,0}},        
            {{0,0,1},{1,1,1},{2,2,1},{3,3,1}},  //diags slice one to right
            {{3,0,1},{2,1,1},{1,2,1},{0,3,1}},        
            {{0,0,2},{1,1,2},{2,2,2},{3,3,2}},  //diags slice two to right      
            {{3,0,2},{2,1,2},{1,2,2},{0,3,2}},        
            {{0,0,3},{1,1,3},{2,2,3},{3,3,3}},  //diags right slice      
            {{3,0,3},{2,1,3},{1,2,3},{0,3,3}},        
            {{0,0,0},{1,1,1},{2,2,2},{3,3,3}},  //cube vertex diags
            {{3,0,0},{2,1,1},{1,2,2},{0,3,3}},
            {{0,3,0},{1,2,1},{2,1,2},{3,0,3}},
            {{3,3,0},{2,2,1},{1,1,2},{0,0,3}}        
        };
    static int board[][][] = new int[4][4][4];
    public static void main(String[] args)  {
        Scanner kb = new Scanner(System.in);
        boolean repeat = true;
        while(repeat){//Print board
            for(int i = 3; i >= 0; i--){//Lev
                System.out.print("\n");
                for(int j = 3; j >= 0; j--){//Row
                    System.out.print("\n");
                    System.out.print(i+ "" + j + " ");
                    for(int k = 0; k < 4; k++){//Col
                        if(board[i][j][k] == 5)
                            System.out.print("X" + " ");
                        else if(board[i][j][k] == 1)
                            System.out.print("O" + " ");
                        else
                            System.out.print("-" + " ");

                    }//Inner loop
                }//Middle Loop
            }//End of outer loop
            System.out.print("\n");
            System.out.println("   0 1 2 3");

            if(draw()){
                System.out.println("Draw");
                repeat = false;
                break;
            }
            int win = checkWin();
            if(win == 5){
                System.out.println("User wins");
                repeat = false;
                break;
            }
            else if(win == 1){
                System.out.println("Computer wins");
                repeat = false;
                break;
            }

            boolean askUser = true;
            while(askUser){
                System.out.println("Type your move as one three digit number(lrc)");
                char[] num = (kb.next()).toCharArray();
                int lev = Integer.parseInt(Character.toString(num[0]));
                int row = Integer.parseInt(Character.toString(num[1]));
                int col = Integer.parseInt(Character.toString(num[2]));

                if(isEmpty(lev,row,col)){
                    askUser = false;
                    board[lev][row][col] = 5; //5 is occupied by the user
                }
            }//End of askUser loop
            computerMove();
        }//End of while loop
    }//End of main

    public static boolean isEmpty(int lev, int row, int col){//Checks if a location is empty
        if(board[lev][row][col] == 0){
            return true;
        }
        return false;
    }

    public static boolean draw(){
        for(int i = 0; i < lines.length; i++){
            for(int j = 0; j < lines[i].length; j++){
                int lev = lines[i][j][0];
                int row = lines[i][j][1];
                int col = lines[i][j][2];

                if(board[lev][row][col] == 0){
                    return false;
                }
            }
        }
        return true;
    }

    public static int checkWin(){

        for(int i = 0; i < lines.length; i++){//Lines
            int countUser= 0;
            int countComputer = 0;
            for(int j = 0; j < lines[i].length; j++){
                int lev = lines[i][j][0];
                int row = lines[i][j][1];
                int col = lines[i][j][2];
                if(board[lev][row][col] == 5){
                    countUser += 5;
                }
                if(board[lev][row][col] == 1){
                    countComputer += 1;
                }
                if(countUser == 20){//User wins
                    return 5; 
                }
                if(countComputer == 4){//Computer wins
                    return 1;
                }
            }
        }
        return 0;
    }

    public static void randomComputerMove(){
        boolean repeat = true;
        while(repeat){
            int randomLev = rndm.nextInt(4);
            int randomRow = rndm.nextInt(4);
            int randomCol = rndm.nextInt(4);
            if(isEmpty(randomLev, randomRow, randomCol)) {
                board[randomLev][randomRow][randomCol] = 1;
                repeat = false;
            }
        }

    }

    public static void computerMove(){
        /*
         * If there is a cell that wins immediately for the computer, play it and win!(game ends)
         * If there is a cell that wins immediately for the user, play it to block.
         * If there is a cell that when occupied would create a fork for the computer, i.e., two lines that would offer immediate wins on the next move, play it.
         * If there is a cell that when occupied would create a fork for the user, play it to block.
         * Randomly play a cell that is in a non-dead line. Dead lines are those that have cells occupied by the computer and cells occupied by the user.
         */
        if(!winningCell(1)){//Check if there is a cell for the computer to win
            if(!winningCell(5)){//Check if there is a winning cell to block
                if(!fork(1)){//Check if there is a cell that can create a fork for the COMPUTER
                    if(!fork(5)){//Check if there is a cell that can block a fork 
                        randomComputerMove();//Play a cell that is in a non-dead line
                    }
                }
            }
        }
    }

    public static boolean winningCell(int num){
        for(int i = 0; i < lines.length; i++){//Lines
            int count = 0;
            int[] winningLocation = {0,0,0,0};
            for(int j = 0; j < lines[i].length; j++){
                int lev = lines[i][j][0];
                int row = lines[i][j][1];
                int col = lines[i][j][2];
                if(board[lev][row][col] == num){
                    count++;
                    winningLocation[j] = num;
                }
                if(count == 3){//If 3 cells are occupied by Computer
                    int arrayLocation = 0;
                    for(int k = 0; k < winningLocation.length; k++){
                        if(winningLocation[k] == 0){
                            arrayLocation = k;
                        }
                    }
                    int winningLev = lines[i][arrayLocation][0];
                    int winningRow = lines[i][arrayLocation][1];
                    int winningCol = lines[i][arrayLocation][2];
                    if(isEmpty(winningLev,winningRow,winningCol) ){
                        board[winningLev][winningRow][winningCol] = 1;
                        return true;
                    }
                }              
            }
        }
        return false;
    }

    public static boolean fork(int num){//Check for a fork: You first check if thre are multiple lines that could be a fork. If true, check if those lines contain the small cell. If so, then it is a fork cell that the user can block or play
        for(int i = 0; i < lines.length; i++){//Lines
            int sum = 0;
            int locationI = 0;
            for(int j = 0; j < lines[i].length; j++){
                int lev = lines[i][j][0];
                int row = lines[i][j][1];
                int col = lines[i][j][2];
                if(board[lev][row][col] == num){
                    sum += 1;
                    locationI = i;
                }
            }
            if(sum == 2){//If there are two occupied locations
                if(makeForkMove(locationI, num)){
                    return true;
                }
            }
        }
        return false;
    }

    public static boolean makeForkMove( int locationI, int num){
        for(int i = 0; i < lines.length; i++){
            int sum = 0;
            for(int j = 0; j < lines[i].length; j++){
                int lev = lines[i][j][0];
                int row = lines[i][j][1];
                int col = lines[i][j][2];
                if( (locationI != i) ) {
                    if(board[lev][row][col] == num){
                        sum += 1;
                    }
                    for(int k = 0; k < lines[i].length; k++){//Compare each of the  4 arrays to each of the 4 arrays from a different line
                        if(sum == 2 && Arrays.equals(lines[locationI][k], lines[i][j])) {
                            if(isEmpty(lev,row,col) ){
                                board[lev][row][col] = 1;
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
}