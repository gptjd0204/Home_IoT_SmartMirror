package com.example.android_home_iot_smartmirror.ui;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.android_home_iot_smartmirror.R;
import com.example.android_home_iot_smartmirror.ui.apicall.GetMemo;


public class AddMemoActivitiy extends AppCompatActivity {
    String urlStr;
    final static String TAG = "AddMemo";
    Toolbar toolbar;
    String ipAddress = "192.168.0.39";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_memo);

        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("메모 추가 및 삭제");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true); // 뒤로가기 버튼, 디폴트로 true만 해도 백버튼이 생김


        // 메모 추가 버튼
        Button updateMemoBtn = findViewById(R.id.updateMemoBtn);
        updateMemoBtn.setOnClickListener(new View.OnClickListener() {
            EditText memo = (EditText)findViewById(R.id.memo);

            @Override
            public void onClick(View view) {
                String memoContents = memo.getText().toString();
                urlStr = "http://" + ipAddress + ":8080/AddMemo?memoTitle=일정&item=" + memoContents +"&level=INFO";
                new GetMemo(AddMemoActivitiy.this, urlStr).execute();
                Toast.makeText(getApplicationContext(),"메모가 추가되었습니다", Toast.LENGTH_SHORT).show();
            }
        });

        // 메모 삭제 버튼
        Button deleteMemoBtn = findViewById(R.id.deleteMemoBtn);
        deleteMemoBtn.setOnClickListener(new View.OnClickListener() {
            //EditText ip = (EditText)findViewById(R.id.ipAddress);
            //EditText memo = (EditText)findViewById(R.id.memo);



            //String urlStr = "http://" + test1 + ":8080/AddMemo?memoTitle=일정&item=" + test2 +"&level=INFO";
            /*String urlStr = new StringBuilder()
                    .append("http://")
                    .append(test1)
                    .append(":8080/AddMemo?memoTitle=일정&item=")
                    .append(test2)
                    .append("&level=INFO").toString();*/


            @Override
            public void onClick(View view) {
                urlStr = "http://" + ipAddress + ":8080/RemoveMemo?memoTitle=일정&numbers&item=1";
                new GetMemo(AddMemoActivitiy.this, urlStr).execute();
                Toast.makeText(getApplicationContext(),"메모가 삭제되었습니다", Toast.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.memo_ip_item, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.memo_settings1:
                final EditText txtEdit = new EditText(AddMemoActivitiy.this);
                txtEdit.setText(ipAddress);
                txtEdit.setHint("192.168.0.39");

                AlertDialog.Builder clsBuilder = new AlertDialog.Builder(AddMemoActivitiy.this);
                clsBuilder.setTitle( "미러 IP 설정" );
                clsBuilder.setView( txtEdit );
                clsBuilder.setPositiveButton("확인",
                        new DialogInterface.OnClickListener() {
                            public void onClick( DialogInterface dialog, int which) {
                                ipAddress = txtEdit.getText().toString();
                            }
                        });
                clsBuilder.setNegativeButton("취소",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {

                            }
                        });
                clsBuilder.show();
                return true;
            case R.id.memo_settings2:

                AlertDialog.Builder clsBuilder1 = new AlertDialog.Builder(AddMemoActivitiy.this);
                clsBuilder1.setTitle( "현재 미러 IP 주소" );
                clsBuilder1.setMessage(ipAddress);

                clsBuilder1.setPositiveButton("확인",
                        new DialogInterface.OnClickListener() {
                            public void onClick( DialogInterface dialog, int which) {
                            }
                        });
                clsBuilder1.show();
                return true;
            case android.R.id.home: //toolbar의 back키 눌렀을 때 동작
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
