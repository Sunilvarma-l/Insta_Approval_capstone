package com.example.loan_transaction_service.service;

import com.example.loan_transaction_service.model.Document;
import com.example.loan_transaction_service.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    /**
     * Find a document by its ID.
     * @param documentId the ID of the document
     * @return Optional<Document>
     */
    public Optional<Document> findById(Long documentId) {
        return documentRepository.findById(documentId);
    }
}
