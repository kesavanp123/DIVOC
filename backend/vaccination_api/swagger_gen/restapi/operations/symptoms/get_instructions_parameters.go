// Code generated by go-swagger; DO NOT EDIT.

package symptoms

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
)

// NewGetInstructionsParams creates a new GetInstructionsParams object
// no default values defined in spec.
func NewGetInstructionsParams() GetInstructionsParams {

	return GetInstructionsParams{}
}

// GetInstructionsParams contains all the bound params for the get instructions operation
// typically these are obtained from a http.Request
//
// swagger:parameters getInstructions
type GetInstructionsParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewGetInstructionsParams() beforehand.
func (o *GetInstructionsParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
