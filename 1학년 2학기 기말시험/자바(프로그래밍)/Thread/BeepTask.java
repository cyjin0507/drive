package work;

import java.awt.Toolkit;

public class BeepTask implements Runnable {
	@overRide
	public void run() {
		Toolkit tk = Toolkit.getDefaultToolkit();
		while(true) {
			tk.beep();
			try {
				Thread.sleep(1000);
			} catch {

			}
		}
	}
}
