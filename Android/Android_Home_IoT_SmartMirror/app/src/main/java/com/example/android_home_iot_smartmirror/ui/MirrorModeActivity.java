package com.example.android_home_iot_smartmirror.ui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.android_home_iot_smartmirror.R;
import com.example.android_home_iot_smartmirror.ui.apicall.GetModeShadow;
import com.example.android_home_iot_smartmirror.ui.apicall.UpdateShadow;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Timer;
import java.util.TimerTask;

public class MirrorModeActivity extends AppCompatActivity {
    String urlStr;
    final static String TAG = "AndroidAPITest";
    Timer timer;
    Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mirror_mode);
        Intent intent = getIntent();
        urlStr = intent.getStringExtra("mirrorModeURL");

        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("미러 모드 변경");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true); // 뒤로가기 버튼, 디폴트로 true만 해도 백버튼이 생김

        timer = new Timer();
        timer.schedule(new TimerTask() {
                           @Override
                           public void run() {
                               new GetModeShadow(MirrorModeActivity.this, urlStr).execute();
                           }
                       },
                0,2000);

    }

    private void clearTextView() {
        TextView reported_mode = findViewById(R.id.reported_mode);
        reported_mode.setText("");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.mode_menu_item, menu);
        return true;
    }

    // 모드 변경 설정
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.mode_settings1:   // 현관 모드
                String edit_mode = "DOOR";

                JSONObject payload = new JSONObject();

                try {
                    JSONArray jsonArray = new JSONArray();
                    String mode_input = edit_mode;
                    if (mode_input != null && !mode_input.equals("")) {
                        JSONObject tag1 = new JSONObject();
                        tag1.put("tagName", "MIRROR_MODE");
                        tag1.put("tagValue", mode_input);

                        jsonArray.put(tag1);
                    }

                    if (jsonArray.length() > 0)
                        payload.put("tags", jsonArray);
                } catch (JSONException e) {
                    Log.e(TAG, "JSONEXception");
                }
                Log.i(TAG,"payload="+payload);
                if (payload.length() >0 ) {
                    new UpdateShadow(MirrorModeActivity.this, urlStr).execute(payload);
                    Toast.makeText(MirrorModeActivity.this,"현관 모드", Toast.LENGTH_SHORT).show();
                }
                else
                    Toast.makeText(MirrorModeActivity.this,"변경할 상태 정보 입력이 필요합니다", Toast.LENGTH_SHORT).show();
                return true;
            case R.id.mode_settings2:   // 심플 모드
                String edit_mode1 = "FREE";
                JSONObject payload1 = new JSONObject();

                try {
                    JSONArray jsonArray = new JSONArray();
                    String mode_input = edit_mode1;
                    if (mode_input != null && !mode_input.equals("")) {
                        JSONObject tag1 = new JSONObject();
                        tag1.put("tagName", "MIRROR_MODE");
                        tag1.put("tagValue", mode_input);

                        jsonArray.put(tag1);
                    }

                    if (jsonArray.length() > 0)
                        payload1.put("tags", jsonArray);
                } catch (JSONException e) {
                    Log.e(TAG, "JSONEXception");
                }
                Log.i(TAG,"payload="+payload1);
                if (payload1.length() >0 ) {
                    new UpdateShadow(MirrorModeActivity.this, urlStr).execute(payload1);
                    Toast.makeText(getApplicationContext(),"심플 모드", Toast.LENGTH_SHORT).show();
                }
                else
                    Toast.makeText(MirrorModeActivity.this,"변경할 상태 정보 입력이 필요합니다", Toast.LENGTH_SHORT).show();
                return true;
            case android.R.id.home: //toolbar의 back키 눌렀을 때 동작
                if (timer != null)
                    timer.cancel();
                clearTextView();
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}