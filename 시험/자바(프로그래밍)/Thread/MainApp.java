package work;

import java.awt.Toolkit;

public class MainApp {
	public static void main(String[] args) {
		Thread t1 = new Thread(new BeepTask());
		t1.start();
	}
}