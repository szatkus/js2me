/* The Computer Language Benchmarks Game

 * http://benchmarksgame.alioth.debian.org/

 * 

 * contributed by Stefan Krause

 * slightly modified by Chad Whipkey

 * parallelized by Colin D Bennett 2008-10-04

 * reduce synchronization cost by The Anh Tran

 * optimizations and refactoring by Enotus 2010-11-11

 * optimization by John Stalcup 2012-2-19

 */


import java.io.*;
public final class mandelbrot {
   static byte[][] out;
   static double[] Crb;
   static double[] Cib;

   static int getByte(int x, int y){
      int res=0;
      for(int i=0;i<8;i+=2){
         double Zr1=Crb[x+i];
         double Zi1=Cib[y];

         double Zr2=Crb[x+i+1];
         double Zi2=Cib[y];

         int b=0;
         int j=49;do{
            double nZr1=Zr1*Zr1-Zi1*Zi1+Crb[x+i];
            double nZi1=Zr1*Zi1+Zr1*Zi1+Cib[y];
            Zr1=nZr1;Zi1=nZi1;

            double nZr2=Zr2*Zr2-Zi2*Zi2+Crb[x+i+1];
            double nZi2=Zr2*Zi2+Zr2*Zi2+Cib[y];
            Zr2=nZr2;Zi2=nZi2;

            if(Zr1*Zr1+Zi1*Zi1>4){b|=2;if(b==3)break;}
            if(Zr2*Zr2+Zi2*Zi2>4){b|=1;if(b==3)break;}
         }while(--j>0);
         res=(res<<2)+b;
      }
      return res^-1;
   }

   static void putLine(int y, byte[] line){
      for (int xb=0; xb<line.length; xb++)
         line[xb]=(byte)getByte(xb*8,y);
   }

   public static void main(String[] args) throws Exception {
	   long time = System.currentTimeMillis();
      int N=6000;
      if (args.length>=1) N=Integer.parseInt(args[0]);

      Crb=new double[N+7]; Cib=new double[N+7];
      double invN=2.0/N; for(int i=0;i<N;i++){ Cib[i]=i*invN-1.0; Crb[i]=i*invN-1.5; }
      out=new byte[N][(N+7)/8];

      
                int y; for(y = 0; y<out.length;y++) putLine(y,out[y]);


     
              System.out.println(System.currentTimeMillis() - time + "ms");

   }
}
