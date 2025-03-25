package br.com.tokiomarine.seguradora.controller;

import br.com.tokiomarine.seguradora.model.Address;
import br.com.tokiomarine.seguradora.model.Client;
import br.com.tokiomarine.seguradora.repository.AddressRepository;
import br.com.tokiomarine.seguradora.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public List<Address> listar() {
        return addressRepository.findAll();
    }

    @PostMapping
    public Address criar(@RequestBody Address address) {
        Address savedAddress = addressRepository.save(address);

        Client client = clientRepository.findById(savedAddress.getClient().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        savedAddress.setClient(client);

        return savedAddress;
    }

    @GetMapping("/cep/{cep}")
    public Address buscarPorCep(@PathVariable String cep) {

        String cleanCep = cep.replaceAll("[^0-9]", "");


        String url = "https://viacep.com.br/ws/" + cleanCep + "/json/";
        ResponseEntity<ViaCepResponse> response = restTemplate.getForEntity(url, ViaCepResponse.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            ViaCepResponse viaCep = response.getBody();
            if (viaCep.isErro()) {
                throw new RuntimeException("CEP não encontrado");
            }

            Address address = new Address();
            address.setAddress(viaCep.getLogradouro());
            address.setComplement(viaCep.getComplemento());
            address.setPostalCode(cleanCep);
            address.setCity(viaCep.getLocalidade());
            address.setState(viaCep.getUf());
            address.setCountry("Brasil");

            return address;
        } else {
            throw new RuntimeException("Erro ao buscar CEP");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> buscar(@PathVariable Long id) {
        return addressRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> atualizar(@PathVariable Long id, @RequestBody Address address) {
        return addressRepository.findById(id)
                .map(existing -> {
                    address.setId(id);
                    return ResponseEntity.ok(addressRepository.save(address));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return addressRepository.findById(id)
                .map(address -> {
                    addressRepository.delete(address);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

class ViaCepResponse {
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String uf;
    private boolean erro;

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLocalidade() {
        return localidade;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public boolean isErro() {
        return erro;
    }

    public void setErro(boolean erro) {
        this.erro = erro;
    }
}