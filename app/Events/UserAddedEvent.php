<?php

namespace App\Events;

use App\Models\UserInfos;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserAddedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public string $email, public int $numberOfUsers)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('Users'),
        ];
    }

    public function broadcastWith(): array{
        $users = UserInfos::query()->where('status', '=', 'Active')->whereDoesntHave('userCredentials', function(Builder $query){
            $query->where('MBemail', $this->email);
        })
        ->with('roles','division','section','department','title','branch','city','userCredentials')
        ->orderBy('created_at', 'desc')
        ->paginate();
        return [
            "AddedBy" => $this->email,
            "UsersAdded" => $this->numberOfUsers,
            "UpdatedUsers" => $users
        ];
    }

    public function broadcastAs(): string{
        return "User-added";
    }
}
