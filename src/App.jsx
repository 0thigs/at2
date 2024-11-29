"use client";

import { Sparkles } from "lucide-react";
import React from "react";

class Client {
  constructor(id, nome, telefone, email, genero) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.genero = genero;
  }
}

class Service {
  constructor(id, nome, valor) {
    this.id = id;
    this.nome = nome;
    this.valor = valor;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "clients",
      clients: [
        new Client(1, "João Silva", "(11) 99999-9999", "joao@email.com", "M"),
        new Client(
          2,
          "Maria Santos",
          "(11) 88888-8888",
          "maria@email.com",
          "F"
        ),
      ],
      services: [
        new Service(1, "Corte de Cabelo", 50.0),
        new Service(2, "Manicure", 30.0),
        new Service(3, "Design de Sobrancelhas", 40.0),
      ],
      newClient: {
        nome: "",
        telefone: "",
        email: "",
        genero: "",
      },
      newService: {
        nome: "",
        valor: 0,
      },
      editingClient: null,
      editingService: null,
    };
  }

  handleAddClient = (e) => {
    e.preventDefault();
    if (this.state.editingClient) {
      this.setState((prevState) => ({
        clients: prevState.clients.map((client) =>
          client.id === prevState.editingClient.id
            ? { ...client, ...prevState.newClient }
            : client
        ),
        editingClient: null,
        newClient: { nome: "", telefone: "", email: "", genero: "" },
      }));
    } else {
      this.setState((prevState) => ({
        clients: [
          ...prevState.clients,
          new Client(
            prevState.clients.length + 1,
            prevState.newClient.nome,
            prevState.newClient.telefone,
            prevState.newClient.email,
            prevState.newClient.genero
          ),
        ],
        newClient: { nome: "", telefone: "", email: "", genero: "" },
      }));
    }
  };

  handleAddService = (e) => {
    e.preventDefault();
    if (this.state.editingService) {
      this.setState((prevState) => ({
        services: prevState.services.map((service) =>
          service.id === prevState.editingService.id
            ? { ...service, ...prevState.newService }
            : service
        ),
        editingService: null,
        newService: { nome: "", valor: 0 },
      }));
    } else {
      this.setState((prevState) => ({
        services: [
          ...prevState.services,
          new Service(
            prevState.services.length + 1,
            prevState.newService.nome,
            prevState.newService.valor
          ),
        ],
        newService: { nome: "", valor: 0 },
      }));
    }
  };

  handleRemoveClient = (id) => {
    this.setState((prevState) => ({
      clients: prevState.clients.filter((client) => client.id !== id),
    }));
  };

  handleRemoveService = (id) => {
    this.setState((prevState) => ({
      services: prevState.services.filter((service) => service.id !== id),
    }));
  };

  handleEditClient = (client) => {
    this.setState({
      editingClient: client,
      newClient: {
        nome: client.nome,
        telefone: client.telefone,
        email: client.email,
        genero: client.genero,
      },
    });
  };

  handleEditService = (service) => {
    this.setState({
      editingService: service,
      newService: {
        nome: service.nome,
        valor: service.valor,
      },
    });
  };

  render() {
    return (
      <div className="p-4 w-full min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 md:p-20">
        <div className="relative p-8 mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl border shadow-2xl backdrop-blur-lg">
          <div className="absolute inset-0 bg-white rounded-xl opacity-5"></div>
          <div className="flex relative gap-3 justify-center items-center">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
              World Beauty
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-white/80">
              Discover the beauty of the world
            </span>
          </div>
        </div>

        <div className="w-full">
          <div className="flex mb-8">
            <button
              className={`flex-1 py-2 px-4 text-center rounded-tl-lg rounded-bl-lg ${
                this.state.activeTab === "clients"
                  ? "bg-white text-purple-600"
                  : "bg-purple-600 text-white"
              }`}
              onClick={() => this.setState({ activeTab: "clients" })}
            >
              Clientes
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center rounded-tr-lg rounded-br-lg ${
                this.state.activeTab === "services"
                  ? "bg-white text-purple-600"
                  : "bg-purple-600 text-white"
              }`}
              onClick={() => this.setState({ activeTab: "services" })}
            >
              Serviços
            </button>
          </div>

          {this.state.activeTab === "clients" && (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">
                Gerenciamento de Clientes
              </h2>
              <form onSubmit={this.handleAddClient} className="mb-6 space-y-4">
                <input
                  className="p-2 w-full rounded border"
                  placeholder="Nome"
                  value={this.state.newClient.nome}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      newClient: {
                        ...prevState.newClient,
                        nome: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  className="p-2 w-full rounded border"
                  placeholder="Telefone"
                  value={this.state.newClient.telefone}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      newClient: {
                        ...prevState.newClient,
                        telefone: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  className="p-2 w-full rounded border"
                  placeholder="Email"
                  type="email"
                  value={this.state.newClient.email}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      newClient: {
                        ...prevState.newClient,
                        email: e.target.value,
                      },
                    }))
                  }
                />
                <select
                  className="p-2 w-full rounded border"
                  value={this.state.newClient.genero}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      newClient: {
                        ...prevState.newClient,
                        genero: e.target.value,
                      },
                    }))
                  }
                >
                  <option value="">Selecione o Gênero</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 w-full text-white bg-purple-600 rounded hover:bg-purple-700"
                >
                  {this.state.editingClient
                    ? "Atualizar Cliente"
                    : "Cadastrar Cliente"}
                </button>
              </form>
              <div className="space-y-4">
                {this.state.clients.map((client) => (
                  <div key={client.id} className="p-4 rounded border">
                    <h3 className="text-xl font-semibold">{client.nome}</h3>
                    <p>Telefone: {client.telefone}</p>
                    <p>Email: {client.email}</p>
                    <p>
                      Gênero: {client.genero === "M" ? "Masculino" : "Feminino"}
                    </p>
                    <div className="flex mt-2 space-x-2">
                      <button
                        onClick={() => this.handleEditClient(client)}
                        className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => this.handleRemoveClient(client.id)}
                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {this.state.activeTab === "services" && (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">
                Gerenciamento de Serviços
              </h2>
              <form onSubmit={this.handleAddService} className="mb-6 space-y-4">
                <input
                  className="p-2 w-full rounded border"
                  placeholder="Nome do Serviço"
                  value={this.state.newService.nome}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      newService: {
                        ...prevState.newService,
                        nome: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  className="p-2 w-full rounded border"
                  type="number"
                  placeholder="Valor"
                  value={this.state.newService.valor}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      newService: {
                        ...prevState.newService,
                        valor: parseFloat(e.target.value),
                      },
                    }))
                  }
                />
                <button
                  type="submit"
                  className="px-4 py-2 w-full text-white bg-purple-600 rounded hover:bg-purple-700"
                >
                  {this.state.editingService
                    ? "Atualizar Serviço"
                    : "Cadastrar Serviço"}
                </button>
              </form>
              <div className="space-y-4">
                {this.state.services.map((service) => (
                  <div key={service.id} className="p-4 rounded border">
                    <h3 className="text-xl font-semibold">{service.nome}</h3>
                    <p>Valor: R$ {service.valor.toFixed(2)}</p>
                    <div className="flex mt-2 space-x-2">
                      <button
                        onClick={() => this.handleEditService(service)}
                        className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => this.handleRemoveService(service.id)}
                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
