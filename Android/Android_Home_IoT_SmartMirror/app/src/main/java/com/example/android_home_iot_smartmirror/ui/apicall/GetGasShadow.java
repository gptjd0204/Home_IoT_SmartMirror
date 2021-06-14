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

public class GetGasShadow extends GetRequest {
    final static String TAG = "AndroidMyMKR1API";
    String urlStr;
    public GetGasShadow(Activity activity, String urlStr) {
        super(activity);
        this.urlStr = urlStr;
    }

    // 가스밸브 상태 조회
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

    @Override
    protected void onPostExecute(String jsonString) {
        if (jsonString == null)
            return;
        Map<String, String> state = getStateFromJSONString(jsonString);
        TextView reported_light = activity.findViewById(R.id.reported_gas);
        ImageView light_drawable = activity.findViewById(R.id.gas_drawable);

        // 아두이노 디바이스에 상태를 조회하여 가스밸브 상태 조회
        if (state.get("reported_SERVO_STATE").equals("ON")){
            light_drawable.setImageResource(R.drawable.gas_on);
            reported_light.setText("가스밸브가 켜져있습니다");
            reported_light.setTextColor(Color.parseColor("#17c217"));
        } else {
            light_drawable.setImageResource(R.drawable.gas_off);
            reported_light.setText("가스밸브가 꺼져있습니다");
            reported_light.setTextColor(Color.parseColor("#ff0000"));
        }
    }

    protected Map<String, String> getStateFromJSONString(String jsonString) {
        Map<String, String> output = new HashMap<>();
        try {
            // 처음 double-quote와 마지막 double-quote 제거
            jsonString = jsonString.substring(1,jsonString.length()-1);
            // \\\" 를 \"로 치환
            jsonString = jsonString.replace("\\\"","\"");
            Log.i(TAG, "jsonString="+jsonString);
            JSONObject root = new JSONObject(jsonString);
            JSONObject state = root.getJSONObject("state");
            JSONObject reported = state.getJSONObject("reported");
            String servoStateValue = reported.getString("SERVO_STATE");
            output.put("reported_SERVO_STATE", servoStateValue);

            JSONObject desired = state.getJSONObject("desired");
            String desired_servoStateValue = desired.getString("SERVO_STATE");
            output.put("desired_SERVO_STATE", desired_servoStateValue);


        } catch (JSONException e) {
            Log.e(TAG, "Exception in processing JSONString.", e);
            e.printStackTrace();
        }
        return output;
    }
}
