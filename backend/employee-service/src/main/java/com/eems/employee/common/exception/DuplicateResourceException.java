package com.eems.employee.common.exception;

/**
 * Thrown when a resource already exists.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }

}