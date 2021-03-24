package com.barclays.ticketer.models;

import com.barclays.ticketer.utils.ResponseConstants.Status;

public class Response {
  private Status status;
  private Object payload;

  public Response(Status success, Object payload) {
    this.status = success;
    this.payload = payload;
  }

  Status getStatus() {
    return status;
  }

  void setStatus(Status status) {
    this.status = status;
  }

  Object getPayload() {
    return payload;
  }

  void setPayload(Object payload) {
    this.payload = payload;
  }
}
