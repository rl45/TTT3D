import java.io.*;
import java.util.Scanner;

public class FileReverse{
	public static void main(String[] args) throws IOException{

		 // check number of command line arguments is at least 2
      if(args.length < 2){
         System.out.println("Usage: FileTokens <input file> <output file>");
         System.exit(1);
      }

		// open files
      Scanner in = new Scanner(new File(args[0]));
      PrintWriter out = new PrintWriter(new FileWriter(args[1]));


      while( in.hasNextLine() ){

      	// split works on blank lines
         String line = in.nextLine().trim() + " "; 

         // split line around white space 
         String[] token = line.split("\\s+");  
         
         for(int i = 0; i < token.length; i++){
         	out.println(stringReverse(token[i]));

         }
      }


      // close files
      in.close();
      out.close();



	}


	public static String stringReverse(String s){

		String reverse = "";
		for(int i = s.length()-1; i >= 0; i--){
			reverse += s.charAt(i);
		}
		return reverse;
	}

}