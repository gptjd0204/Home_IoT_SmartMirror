package com.example.android_home_iot_smartmirror.ui.apicall;

import android.app.Activity;
import android.graphics.Color;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.android_home_iot_smartmirror.R;
import com.example.android_home_iot_smartmirror.httpconnection.GetRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;


// 메모를 추가할 때 사용 [HTTP GET을 사용하여 메모를 추가]
public class GetMemo extends GetRequest {
    final static String TAG = "GetMemo";
    String urlStr;
    public GetMemo(Activity activity, String urlStr) {
        super(activity);
        this.urlStr = urlStr;
    }


    @Override
    protected void onPreExecute() {
        try {
            Log.e(TAG, urlStr);
            url = new URL(urlStr);

        } catch (MalformedURLException e) {
            Toast.makeText(activity,"URL is invalid:"+urlStr, Toast.LENGTH_SHORT).show();
            e.printStackTrace();
            activity.finish();
        }
    }
}

