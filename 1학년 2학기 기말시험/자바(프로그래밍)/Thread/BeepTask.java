package work;

import java.awt.Toolkit;

public class BeepTask implements Runnable {
	@overRide
	public void run() {
		Toolkit toolkit = Toolkit.getDefaultToolkit();
		while(true) {
			toolkit.beep();
			try {
				Thread.sleep(1000);
			} catch {

			}
		}
	}
}