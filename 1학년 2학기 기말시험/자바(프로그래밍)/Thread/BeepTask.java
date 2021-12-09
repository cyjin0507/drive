package work;

import java.awt.Toolkit;

public class BeepTask implements Runnable { // 쓰레드를 쓰기위해 Runnable씀 
	
	@Override
	public void run() { // Runnable쓰면 필수적으로 사용!!
		Toolkit toolkit = Toolkit.getDefaultToolkit(); // Toolkit 쓰기 위해 (쓰레드 소리 확인하기 위해)
		while(true) { // Thread 무한대로 돈다
			toolkit.beep(); // 띵 소리를 나게 한다
			try { // Thread.sleep(1000)를 쓰기 위해 필수 사용
				Thread.sleep(1000); // 몇초마다 실행 (1000) = 1초
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
	}
 
}
