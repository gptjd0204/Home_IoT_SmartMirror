package com.example.android_home_iot_smartmirror.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.android_home_iot_smartmirror.R;

public class HomeIotActivity extends AppCompatActivity {
    String urlStr;
    Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_iot);
        Intent intent = getIntent();
        urlStr = intent.getStringExtra("thingShadowURL");

        // 툴바 생성
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("홈 IoT 상태 조회");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true); // 뒤로가기 버튼


        // 홈 상태 조회 및 변경 (거실 실내등)
        Button firstLightShadowBtn = findViewById(R.id.firstLightShadowBtn);
        firstLightShadowBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //String urlstr = urlStr.concat("/MyMKR2");
                String urlstr = "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR2";
                if (urlstr == null || urlstr.equals("")) {
                    Toast.makeText(HomeIotActivity.this, "실내등 상태 조회/변경 API URI 입력이 필요합니다.", Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent intent = new Intent(HomeIotActivity.this, HomeFirstLightActivity.class);
                //intent.putExtra("lightShadowURL", urlstr);
                intent.putExtra("firstLightShadowURL", urlstr);
                startActivity(intent);

            }
        });

        // 홈 상태 조회 및 변경 (1번방 실내등)
        Button secondLightShadowBtn = findViewById(R.id.secondLightShadowBtn);
        secondLightShadowBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //String urlstr = urlStr.concat("/MyMKR2");
                String urlstr = "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR3";
                if (urlstr == null || urlstr.equals("")) {
                    Toast.makeText(HomeIotActivity.this, "실내등 상태 조회/변경 API URI 입력이 필요합니다.", Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent intent = new Intent(HomeIotActivity.this, HomeSecondLightActivity.class);
                intent.putExtra("secondLightShadowURL", urlstr);
                startActivity(intent);
            }
        });

        // 홈 상태 조회 및 변경 (가스밸브)
        Button gasShadowBtn = findViewById(R.id.gasShadowBtn);
        gasShadowBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //String urlstr = urlStr.concat("/MyMKR2");
                String urlstr = "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR1";
                if (urlstr == null || urlstr.equals("")) {
                    Toast.makeText(HomeIotActivity.this, "가스 밸브 상태 조회/변경 API URI 입력이 필요합니다.", Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent intent = new Intent(HomeIotActivity.this, HomeGasActivity.class);
                intent.putExtra("gasShadowURL", urlstr);
                startActivity(intent);

            }
        });

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home: //toolbar의 back키 눌렀을 때 동작
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
