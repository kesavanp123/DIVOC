// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/divoc/portal-api/swagger_gen/models"
)

// GetMedicinesOKCode is the HTTP code returned for type GetMedicinesOK
const GetMedicinesOKCode int = 200

/*GetMedicinesOK Get medicine

swagger:response getMedicinesOK
*/
type GetMedicinesOK struct {

	/*
	  In: Body
	*/
	Payload []*models.Medicine `json:"body,omitempty"`
}

// NewGetMedicinesOK creates GetMedicinesOK with default headers values
func NewGetMedicinesOK() *GetMedicinesOK {

	return &GetMedicinesOK{}
}

// WithPayload adds the payload to the get medicines o k response
func (o *GetMedicinesOK) WithPayload(payload []*models.Medicine) *GetMedicinesOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get medicines o k response
func (o *GetMedicinesOK) SetPayload(payload []*models.Medicine) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetMedicinesOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.Medicine, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}
