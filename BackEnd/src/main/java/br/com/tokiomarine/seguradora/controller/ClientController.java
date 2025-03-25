package br.com.tokiomarine.seguradora.controller;

import br.com.tokiomarine.seguradora.model.Client;
import br.com.tokiomarine.seguradora.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<Client> listar() {
        return clientRepository.findAll();
    }

    @PostMapping
    public Client criar(@RequestBody Client client) {
        return clientRepository.save(client);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> buscar(@PathVariable Long id) {
        return clientRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> atualizar(@PathVariable Long id, @RequestBody Client client) {
        return clientRepository.findById(id)
                .map(existing -> {
                    client.setId(id);
                    return ResponseEntity.ok(clientRepository.save(client));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return clientRepository.findById(id)
                .map(client -> {
                    clientRepository.delete(client);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}