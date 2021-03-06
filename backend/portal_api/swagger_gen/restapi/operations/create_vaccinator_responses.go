// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"
)

// CreateVaccinatorOKCode is the HTTP code returned for type CreateVaccinatorOK
const CreateVaccinatorOKCode int = 200

/*CreateVaccinatorOK OK

swagger:response createVaccinatorOK
*/
type CreateVaccinatorOK struct {
}

// NewCreateVaccinatorOK creates CreateVaccinatorOK with default headers values
func NewCreateVaccinatorOK() *CreateVaccinatorOK {

	return &CreateVaccinatorOK{}
}

// WriteResponse to the client
func (o *CreateVaccinatorOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// CreateVaccinatorBadRequestCode is the HTTP code returned for type CreateVaccinatorBadRequest
const CreateVaccinatorBadRequestCode int = 400

/*CreateVaccinatorBadRequest Invalid input

swagger:response createVaccinatorBadRequest
*/
type CreateVaccinatorBadRequest struct {
}

// NewCreateVaccinatorBadRequest creates CreateVaccinatorBadRequest with default headers values
func NewCreateVaccinatorBadRequest() *CreateVaccinatorBadRequest {

	return &CreateVaccinatorBadRequest{}
}

// WriteResponse to the client
func (o *CreateVaccinatorBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(400)
}
