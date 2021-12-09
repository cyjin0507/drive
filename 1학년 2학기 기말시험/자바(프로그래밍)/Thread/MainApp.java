package work;

import java.awt.Toolkit;

public class MainApp {

	public static void main(String[] args) { // 런 돌릴때 실행
		Thread t1 = new Thread(new BeepTask()); // BeepTask.java를 불러와 t1에 담는다
		t1.start(); // t1를 시작해 Thread를 실행한다.
	}

}
