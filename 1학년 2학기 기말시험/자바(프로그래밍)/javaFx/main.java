public class Main extends Application { // Application을 extends해온다 (FXML화면을 띄우기 위해)
    @Override // Appication을 쓰면 꼭 써줘야됨
    public void start(Stage primaryStage) {
        try { // try catch문으로 감싸줘야 됨
            FXMLLoader loader = new FXMLLoader(); // fxml를 실행시켜줄 변수를 loader에 담았다.
            loader.setLocation(getClass().getResource("/view/MainLayout.fxml")); // 처음 보여질 화면의 경로를 설정해준다.
            AnchorPane root = (AnchorPane) loader.load();
            Scene scene = new Scene(root);
            scene.scene getStylesheets().add(getClass().getResource("application.css").toExternalForm()); // 이 화면의 application.css를 먹여주겠다고 선언
            primaryStage.setTitle("Todo"); // 화면의 이름을 Todo라고 지정(화면 최상단의 표시됨)
            primaryStage.setScene(scene); // 보여질 화면을 세팅한다
            primaryStage.show(); // 화면을 띄우준다
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        launch(args); // 실행시켜준다
    }
}