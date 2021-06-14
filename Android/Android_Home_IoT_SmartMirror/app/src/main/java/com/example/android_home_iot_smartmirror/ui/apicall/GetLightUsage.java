package com.example.android_home_iot_smartmirror.ui.apicall;

import android.app.Activity;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.android_home_iot_smartmirror.R;
import com.example.android_home_iot_smartmirror.httpconnection.GetRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import static java.sql.Types.NULL;

public class GetLightUsage extends GetRequest {
    final static String TAG = "AndroidAPITest";
    String urlStr;
    String prevTimestamp;
    String currentTimestamp;

    public GetLightUsage(Activity activity, String urlStr) {
        super(activity);
        this.urlStr = urlStr;
    }

    // 실내등 사용량 조회
    @Override
    protected void onPreExecute() {
        try {
            TextView textView_Shock_Date1 = activity.findViewById(R.id.textView_light_date1);
            TextView textView_Shock_Date2 = activity.findViewById(R.id.textView_light_date2);
            // 사용자가 설정한 날짜에 실내등 사용량 조회
            String params = String.format("?from=%s&to=%s",textView_Shock_Date1.getText().toString(),
                    textView_Shock_Date2.getText().toString());

            Log.i(TAG,"urlStr="+urlStr+params);
            url = new URL(urlStr+params);

        } catch (MalformedURLException e) {
            Toast.makeText(activity,"URL is invalid:"+urlStr, Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }
        TextView message = activity.findViewById(R.id.light_message2);
        message.setText("조회중...");
    }

    @Override
    protected void onPostExecute(String jsonString) {
        TextView message = activity.findViewById(R.id.light_message2);
        if (jsonString == null) {
            message.setText("로그 없음");
            return;
        }
        message.setText("");
        ArrayList<GetLightUsage.Tag> arrayList = getArrayListFromJSONString(jsonString);


        // 계산된 사용량을 앱 화면에 표시
        final ArrayAdapter adapter = new ArrayAdapter(activity,
                android.R.layout.simple_list_item_1,
                arrayList.toArray());
        ListView txtList = activity.findViewById(R.id.light_logList);
        txtList.setAdapter(adapter);
        txtList.setDividerHeight(10);
    }

    // DynamoDB에 있는 데이터를 RestAPI를 이용하여 가져와 사용량 계산
    protected ArrayList<GetLightUsage.Tag> getArrayListFromJSONString(String jsonString) {
        ArrayList<GetLightUsage.Tag> output = new ArrayList();
        try {
            // 처음 double-quote와 마지막 double-quote 제거
            jsonString = jsonString.substring(1,jsonString.length()-1);
            // \\\" 를 \"로 치환
            jsonString = jsonString.replace("\\\"","\"");

            Log.i(TAG, "jsonString="+jsonString);

            JSONObject root = new JSONObject(jsonString);
            JSONArray jsonArray = root.getJSONArray("data");
            int lightOn = 0;
            prevTimestamp = "null";

            for (int i = 0; i < jsonArray.length(); i++) {

                JSONObject jsonObject = (JSONObject)jsonArray.get(i);

                String times = jsonObject.getString("timestamp");
                int idx = times.indexOf(" ");
                currentTimestamp = times.substring(0, idx);

                if(prevTimestamp.equals("null")) {
                    prevTimestamp = currentTimestamp;
                }


                if( !prevTimestamp.equals(currentTimestamp) || i == (jsonArray.length()-1)) {
                    GetLightUsage.Tag thing = new GetLightUsage.Tag(lightOn, prevTimestamp);
                    output.add(thing);
                    lightOn = 0;
                }

                if(jsonObject.getString("SERVO_STATE").equals("ON")){
                    lightOn++;
                }
                prevTimestamp = currentTimestamp;
            }

        } catch (JSONException e) {
            //Log.e(TAG, "Exception in processing JSONString.", e);
            e.printStackTrace();
        }
        return output;
    }

    // Tag 수정
    class Tag {
        int light_on;
        String timestamp;

        public Tag(int lightOn, String time) {
            light_on = lightOn;
            timestamp = time;
        }

        public String toString() {
            return String.format("%s에 실내등을 %d번 사용했습니다!", timestamp, light_on);
        }
    }
}
