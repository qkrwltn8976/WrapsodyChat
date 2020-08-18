package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wrapsody.messaging.model.enums.ResultCode;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse {
	private boolean isSuccess;
	private ResultCode resultCode;
	private String message;
	private Map<String, Object> payload;
	
	public boolean isSuccess() {
		return isSuccess;
	}
	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}
	
	public ResultCode getResultCode() {
		return resultCode;
	}

	public void setResultCode(ResultCode resultCode) {
		this.resultCode = resultCode;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	public Map<String, Object> getPayload() {
		return payload;
	}
	public void setPayload(Map<String, Object> payload) {
		this.payload = payload;
	}
	
	public ApiResponse(boolean isSuccess, ResultCode resultCode) {
		super();
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
	}
	
	public ApiResponse(boolean isSuccess, ResultCode resultCode, String message) {
		super();
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
		this.message = message;
	}
	
	@JsonCreator()
	public ApiResponse(@JsonProperty("isSuccess") boolean isSuccess, @JsonProperty("resultCode") ResultCode resultCode, @JsonProperty("message") String message, @JsonProperty("payload") Map<String, Object> payload) {
		super();
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
		this.message = message;
		this.payload = payload;
	}
	
	public ApiResponse(boolean isSuccess, ResultCode resultCode, Map<String, Object> payload) {
		super();
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
		this.payload = payload;
	}
	
	public ApiResponse(boolean isSuccess, ResultCode resultCode, ModelBase payload) {
		super();
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
		this.payload = new HashMap<String, Object>(1);
		this.payload.put(payload.getClass().getSimpleName(), payload);
	}
	
}