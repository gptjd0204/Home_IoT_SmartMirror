package com.example.android_home_iot_smartmirror.ui.apicall;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import com.example.android_home_iot_smartmirror.httpconnection.PutRequest;

import java.net.MalformedURLException;
import java.net.URL;

public class UpdateShadow extends PutRequest {
    final static String TAG = "AndroidHomeIoTAPITest";
    String urlStr;

    // 실내등 및 가스밸브 상태 변경 (아두이노 디바이스 제어)
    public UpdateShadow(Activity activity, String urlStr) {
        super(activity);
        this.urlStr = urlStr;
    }

    @Override
    protected void onPreExecute() {
        try {
            Log.e(TAG, urlStr);
            url = new URL(urlStr);

        } catch (MalformedURLException e) {
            e.printStackTrace();
            Toast.makeText(activity,"URL is invalid:"+urlStr, Toast.LENGTH_SHORT).show();
            activity.finish();

        }
    }
    @Override
    protected void onPostExecute(String result) {
        //Toast.makeText(activity,result, Toast.LENGTH_SHORT).show();
    }
}
